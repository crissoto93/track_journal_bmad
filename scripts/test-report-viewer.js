#!/usr/bin/env node

/**
 * Test Report Viewer for Track Journal
 * Displays test execution reports in a user-friendly format
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

class TestReportViewer {
  constructor() {
    this.reportsDir = path.join(process.cwd(), 'test-reports');
  }

  displayQAReport() {
    const qaReportPath = path.join(this.reportsDir, 'qa-report.json');
    
    if (!fs.existsSync(qaReportPath)) {
      console.log(chalk.red('❌ No QA report found. Run tests with reporting enabled first.'));
      console.log(chalk.yellow('💡 Try: npm run test:report'));
      return;
    }

    try {
      const reportData = JSON.parse(fs.readFileSync(qaReportPath, 'utf8'));
      this.renderQAReport(reportData);
    } catch (error) {
      console.log(chalk.red('❌ Error reading QA report:', error.message));
    }
  }

  renderQAReport(data) {
    console.log('\n' + chalk.cyan.bold('📊 Track Journal - QA Test Report'));
    console.log(chalk.gray('=' .repeat(60)));
    
    // Summary
    console.log(chalk.white.bold('\n📈 Test Summary:'));
    console.log(`  ${chalk.green('✅ Passed:')} ${data.summary.passedTests}`);
    console.log(`  ${chalk.red('❌ Failed:')} ${data.summary.failedTests}`);
    console.log(`  ${chalk.yellow('⏭️  Skipped:')} ${data.summary.skippedTests}`);
    console.log(`  ${chalk.blue('📋 Total:')} ${data.summary.totalTests}`);
    console.log(`  ${chalk.magenta('📊 Success Rate:')} ${data.summary.successRate}%`);
    console.log(`  ${chalk.cyan('⏱️  Execution Time:')} ${data.summary.executionTime}ms`);

    // Test Categories
    console.log(chalk.white.bold('\n🏷️  Test Categories:'));
    Object.entries(data.categories).forEach(([category, stats]) => {
      const successRate = stats.count > 0 ? ((stats.passed / stats.count) * 100).toFixed(2) : '0.00';
      const color = successRate >= 80 ? chalk.green : successRate >= 60 ? chalk.yellow : chalk.red;
      console.log(`  ${chalk.white(category.toUpperCase())}: ${stats.passed}/${stats.count} (${color(successRate + '%')})`);
    });

    // Performance
    if (data.performance && data.performance.averageTestTime) {
      console.log(chalk.white.bold('\n⚡ Performance Metrics:'));
      console.log(`  ${chalk.blue('Average Test Time:')} ${data.performance.averageTestTime.toFixed(2)}ms`);
      
      if (data.performance.slowestTests && data.performance.slowestTests.length > 0) {
        console.log(chalk.yellow('  🐌 Slowest Tests:'));
        data.performance.slowestTests.slice(0, 3).forEach((test, index) => {
          console.log(`    ${index + 1}. ${test.name} (${test.duration}ms)`);
        });
      }
    }

    // Recommendations
    if (data.recommendations && data.recommendations.length > 0) {
      console.log(chalk.white.bold('\n💡 Recommendations:'));
      data.recommendations.forEach((rec, index) => {
        console.log(`  ${index + 1}. ${chalk.yellow(rec)}`);
      });
    }

    // Report Files
    console.log(chalk.white.bold('\n📁 Available Reports:'));
    this.listAvailableReports();

    console.log(chalk.gray('\n' + '=' .repeat(60)));
  }

  listAvailableReports() {
    const reports = [
      { name: 'HTML Report', path: 'html/test-report.html', type: 'html' },
      { name: 'JUnit XML', path: 'junit/junit.xml', type: 'xml' },
      { name: 'Coverage Report', path: 'coverage/lcov-report/index.html', type: 'html' },
      { name: 'QA Report', path: 'qa-report.json', type: 'json' },
    ];

    reports.forEach(report => {
      const fullPath = path.join(this.reportsDir, report.path);
      const exists = fs.existsSync(fullPath);
      const status = exists ? chalk.green('✓') : chalk.red('✗');
      console.log(`  ${status} ${report.name}: ${report.path}`);
    });
  }

  displayCoverageReport() {
    const coveragePath = path.join(this.reportsDir, 'coverage', 'coverage-summary.json');
    
    if (!fs.existsSync(coveragePath)) {
      console.log(chalk.red('❌ No coverage report found.'));
      return;
    }

    try {
      const coverageData = JSON.parse(fs.readFileSync(coveragePath, 'utf8'));
      this.renderCoverageReport(coverageData);
    } catch (error) {
      console.log(chalk.red('❌ Error reading coverage report:', error.message));
    }
  }

  renderCoverageReport(data) {
    console.log('\n' + chalk.cyan.bold('📊 Code Coverage Report'));
    console.log(chalk.gray('=' .repeat(60)));

    if (data.total) {
      const total = data.total;
      const coverage = {
        statements: ((total.statements.covered / total.statements.total) * 100).toFixed(2),
        branches: ((total.branches.covered / total.branches.total) * 100).toFixed(2),
        functions: ((total.functions.covered / total.functions.total) * 100).toFixed(2),
        lines: ((total.lines.covered / total.lines.total) * 100).toFixed(2),
      };

      console.log(chalk.white.bold('\n📈 Overall Coverage:'));
      console.log(`  ${chalk.blue('Statements:')} ${this.getColoredPercentage(coverage.statements)}`);
      console.log(`  ${chalk.blue('Branches:')} ${this.getColoredPercentage(coverage.branches)}`);
      console.log(`  ${chalk.blue('Functions:')} ${this.getColoredPercentage(coverage.functions)}`);
      console.log(`  ${chalk.blue('Lines:')} ${this.getColoredPercentage(coverage.lines)}`);
    }
  }

  getColoredPercentage(percentage) {
    const num = parseFloat(percentage);
    if (num >= 80) return chalk.green(percentage + '%');
    if (num >= 60) return chalk.yellow(percentage + '%');
    return chalk.red(percentage + '%');
  }

  openReport(reportType) {
    const reportPaths = {
      html: path.join(this.reportsDir, 'html', 'test-report.html'),
      coverage: path.join(this.reportsDir, 'coverage', 'lcov-report', 'index.html'),
    };

    const reportPath = reportPaths[reportType];
    if (!reportPath || !fs.existsSync(reportPath)) {
      console.log(chalk.red(`❌ ${reportType} report not found.`));
      return;
    }

    const open = require('open');
    open(reportPath);
    console.log(chalk.green(`✅ Opening ${reportType} report in browser...`));
  }
}

// CLI Interface
function main() {
  const viewer = new TestReportViewer();
  const args = process.argv.slice(2);

  if (args.length === 0) {
    viewer.displayQAReport();
    return;
  }

  switch (args[0]) {
    case 'qa':
      viewer.displayQAReport();
      break;
    case 'coverage':
      viewer.displayCoverageReport();
      break;
    case 'open':
      if (args[1]) {
        viewer.openReport(args[1]);
      } else {
        console.log(chalk.yellow('Usage: node test-report-viewer.js open <html|coverage>'));
      }
      break;
    default:
      console.log(chalk.yellow('Usage:'));
      console.log('  node test-report-viewer.js [qa|coverage|open <type>]');
      console.log('');
      console.log('Commands:');
      console.log('  qa        - Display QA test report');
      console.log('  coverage  - Display coverage report');
      console.log('  open html - Open HTML test report in browser');
      console.log('  open coverage - Open coverage report in browser');
  }
}

if (require.main === module) {
  main();
}

module.exports = TestReportViewer;
