/**
 * Custom QA Test Reporter for Track Journal
 * Provides detailed test execution reports with QA-specific metrics
 */

class QAReporter {
  constructor(globalConfig, options) {
    this.globalConfig = globalConfig;
    this.options = options;
    this.results = {
      startTime: Date.now(),
      endTime: null,
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      skippedTests: 0,
      testSuites: [],
      coverage: null,
      performance: {
        slowestTests: [],
        fastestTests: [],
        averageTestTime: 0,
      },
      quality: {
        flakyTests: [],
        criticalFailures: [],
        testCategories: {
          unit: { count: 0, passed: 0, failed: 0 },
          integration: { count: 0, passed: 0, failed: 0 },
          e2e: { count: 0, passed: 0, failed: 0 },
        },
      },
    };
  }

  onRunStart(results, options) {
    console.log('\n🚀 QA Test Execution Started');
    console.log('=' .repeat(50));
    this.results.startTime = Date.now();
  }

  onTestStart(test) {
    // Track test start time for performance metrics
    test.startTime = Date.now();
  }

  onTestResult(test, testResult, aggregatedResult) {
    const testSuite = {
      name: testResult.testFilePath,
      tests: testResult.testResults,
      performance: testResult.perfStats,
      coverage: testResult.coverage,
    };

    this.results.testSuites.push(testSuite);

    // Update counters
    this.results.totalTests += testResult.numPassingTests + testResult.numFailingTests + testResult.numPendingTests;
    this.results.passedTests += testResult.numPassingTests;
    this.results.failedTests += testResult.numFailingTests;
    this.results.skippedTests += testResult.numPendingTests;

    // Categorize tests
    this.categorizeTests(testResult.testResults, testResult.testFilePath);

    // Track performance
    this.trackPerformance(testResult.testResults);
  }

  onRunComplete(contexts, results) {
    this.results.endTime = Date.now();
    this.results.coverage = results.coverageMap;
    
    this.generateReport();
  }

  categorizeTests(testResults, filePath) {
    testResults.forEach(test => {
      const category = this.determineTestCategory(filePath, test.title);
      const status = test.status;
      
      if (this.results.quality.testCategories[category]) {
        this.results.quality.testCategories[category].count++;
        if (status === 'passed') {
          this.results.quality.testCategories[category].passed++;
        } else if (status === 'failed') {
          this.results.quality.testCategories[category].failed++;
        }
      }
    });
  }

  determineTestCategory(filePath, testTitle) {
    if (filePath.includes('e2e') || testTitle.toLowerCase().includes('e2e')) {
      return 'e2e';
    } else if (filePath.includes('integration') || testTitle.toLowerCase().includes('integration')) {
      return 'integration';
    } else {
      return 'unit';
    }
  }

  trackPerformance(testResults) {
    testResults.forEach(test => {
      if (test.duration) {
        const testInfo = {
          name: test.fullName,
          duration: test.duration,
          status: test.status,
        };

        // Track slowest tests
        this.results.performance.slowestTests.push(testInfo);
        this.results.performance.slowestTests.sort((a, b) => b.duration - a.duration);
        this.results.performance.slowestTests = this.results.performance.slowestTests.slice(0, 10);

        // Track fastest tests
        this.results.performance.fastestTests.push(testInfo);
        this.results.performance.fastestTests.sort((a, b) => a.duration - b.duration);
        this.results.performance.fastestTests = this.results.performance.fastestTests.slice(0, 10);
      }
    });
  }

  generateReport() {
    const executionTime = this.results.endTime - this.results.startTime;
    const successRate = ((this.results.passedTests / this.results.totalTests) * 100).toFixed(2);
    
    // Calculate average test time
    const allDurations = this.results.performance.slowestTests.concat(this.results.performance.fastestTests);
    const totalDuration = allDurations.reduce((sum, test) => sum + test.duration, 0);
    this.results.performance.averageTestTime = totalDuration / allDurations.length;

    console.log('\n📊 QA Test Execution Report');
    console.log('=' .repeat(50));
    console.log(`⏱️  Total Execution Time: ${executionTime}ms`);
    console.log(`📈 Success Rate: ${successRate}%`);
    console.log(`✅ Passed: ${this.results.passedTests}`);
    console.log(`❌ Failed: ${this.results.failedTests}`);
    console.log(`⏭️  Skipped: ${this.results.skippedTests}`);
    console.log(`📋 Total Tests: ${this.results.totalTests}`);
    
    console.log('\n🏷️  Test Categories:');
    Object.entries(this.results.quality.testCategories).forEach(([category, stats]) => {
      const categorySuccessRate = stats.count > 0 ? ((stats.passed / stats.count) * 100).toFixed(2) : '0.00';
      console.log(`  ${category.toUpperCase()}: ${stats.passed}/${stats.count} (${categorySuccessRate}%)`);
    });

    console.log('\n⚡ Performance Metrics:');
    console.log(`  Average Test Time: ${this.results.performance.averageTestTime.toFixed(2)}ms`);
    
    if (this.results.performance.slowestTests.length > 0) {
      console.log('  🐌 Slowest Tests:');
      this.results.performance.slowestTests.slice(0, 3).forEach((test, index) => {
        console.log(`    ${index + 1}. ${test.name} (${test.duration}ms)`);
      });
    }

    if (this.results.failedTests > 0) {
      console.log('\n🚨 Failed Tests Summary:');
      this.results.testSuites.forEach(suite => {
        suite.tests.filter(test => test.status === 'failed').forEach(test => {
          console.log(`  ❌ ${test.fullName}`);
          if (test.failureMessages && test.failureMessages.length > 0) {
            console.log(`     Error: ${test.failureMessages[0].split('\n')[0]}`);
          }
        });
      });
    }

    console.log('\n📁 Reports Generated:');
    console.log('  • HTML Report: test-reports/html/test-report.html');
    console.log('  • JUnit XML: test-reports/junit/junit.xml');
    console.log('  • Coverage Report: test-reports/coverage/');
    console.log('  • QA Report: test-reports/qa-report.json');

    // Save QA-specific report
    this.saveQAReport();
  }

  saveQAReport() {
    const fs = require('fs');
    const path = require('path');
    
    const reportDir = path.join(process.cwd(), 'test-reports');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const qaReportPath = path.join(reportDir, 'qa-report.json');
    const reportData = {
      timestamp: new Date().toISOString(),
      summary: {
        totalTests: this.results.totalTests,
        passedTests: this.results.passedTests,
        failedTests: this.results.failedTests,
        skippedTests: this.results.skippedTests,
        successRate: ((this.results.passedTests / this.results.totalTests) * 100).toFixed(2),
        executionTime: this.results.endTime - this.results.startTime,
      },
      categories: this.results.quality.testCategories,
      performance: this.results.performance,
      recommendations: this.generateRecommendations(),
    };

    fs.writeFileSync(qaReportPath, JSON.stringify(reportData, null, 2));
  }

  generateRecommendations() {
    const recommendations = [];
    const successRate = (this.results.passedTests / this.results.totalTests) * 100;

    if (successRate < 80) {
      recommendations.push('⚠️  Test success rate is below 80%. Review failed tests and improve test stability.');
    }

    if (this.results.performance.averageTestTime > 1000) {
      recommendations.push('🐌 Average test execution time is high. Consider optimizing slow tests.');
    }

    if (this.results.failedTests > 0) {
      recommendations.push('🔧 Investigate and fix failing tests to maintain code quality.');
    }

    if (this.results.quality.testCategories.unit.count === 0) {
      recommendations.push('📝 Add unit tests to improve code coverage and maintainability.');
    }

    if (this.results.quality.testCategories.integration.count === 0) {
      recommendations.push('🔗 Consider adding integration tests for better system validation.');
    }

    return recommendations;
  }
}

module.exports = QAReporter;
