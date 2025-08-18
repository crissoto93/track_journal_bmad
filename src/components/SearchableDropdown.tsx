import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Text, TextInput, ActivityIndicator } from 'react-native-paper';
import { useTheme } from '../theme';

import Icon from './Icon';

interface SearchableDropdownProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  data: Array<{ id: string; name: string; [key: string]: any }>;
  placeholder?: string;
  loading?: boolean;
  error?: string;
  disabled?: boolean;
  searchPlaceholder?: string;
  noDataMessage?: string;
}

export function SearchableDropdown({
  label,
  value,
  onValueChange,
  data,
  placeholder = 'Select an option',
  loading = false,
  error,
  disabled = false,
  searchPlaceholder = 'Search...',
  noDataMessage = 'No options available'
}: SearchableDropdownProps): React.JSX.Element {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  const selectedItem = data.find(item => item.id === value);

  const handleOpen = () => {
    if (!disabled) {
      setIsOpen(true);
      setSearchTerm('');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleSelect = (item: { id: string; name: string }) => {
    onValueChange(item.id);
    handleClose();
  };

  const handleClear = () => {
    onValueChange('');
  };

  return (
    <View style={styles.container}>
      <Text 
        variant="bodyMedium" 
        style={[styles.label, { color: theme.colors.onSurface }]}
      >
        {label}
      </Text>
      
      <TouchableOpacity
        style={[
          styles.input,
          { 
            backgroundColor: theme.colors.surface,
            borderColor: error ? theme.colors.error : theme.colors.outline,
          },
          disabled && { opacity: 0.6 }
        ]}
        onPress={handleOpen}
        disabled={disabled}
      >
        <View style={styles.inputContent}>
          {selectedItem ? (
            <Text 
              variant="bodyMedium" 
              style={[styles.selectedText, { color: theme.colors.onSurface }]}
            >
              {selectedItem.name}
            </Text>
          ) : (
            <Text 
              variant="bodyMedium" 
              style={[styles.placeholder, { color: theme.colors.onSurfaceVariant }]}
            >
              {placeholder}
            </Text>
          )}
          
          <View style={styles.inputActions}>
            {value && (
              <TouchableOpacity
                onPress={handleClear}
                style={styles.clearButton}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Icon
                  name="close-circle"
                  family="MaterialCommunityIcons"
                  size="sm"
                  color={theme.colors.onSurfaceVariant}
                />
              </TouchableOpacity>
            )}
            
            <Icon
              name={isOpen ? "chevron-up" : "chevron-down"}
              family="MaterialCommunityIcons"
              size="sm"
              color={theme.colors.onSurfaceVariant}
            />
          </View>
        </View>
      </TouchableOpacity>

      {error && (
        <Text 
          variant="bodySmall" 
          style={[styles.errorText, { color: theme.colors.error }]}
        >
          {error}
        </Text>
      )}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={handleClose}
        >
          <View 
            style={[
              styles.modalContent,
              { backgroundColor: theme.colors.surface }
            ]}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.modalHeader}>
              <Text 
                variant="titleMedium" 
                style={[styles.modalTitle, { color: theme.colors.onSurface }]}
              >
                {label}
              </Text>
              <TouchableOpacity
                onPress={handleClose}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Icon
                  name="close"
                  family="MaterialCommunityIcons"
                  size="md"
                  color={theme.colors.onSurfaceVariant}
                />
              </TouchableOpacity>
            </View>

            <TextInput
              ref={inputRef}
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChangeText={setSearchTerm}
              style={[
                styles.searchInput,
                { 
                  backgroundColor: theme.colors.surfaceVariant,
                  color: theme.colors.onSurface
                }
              ]}
              mode="outlined"
              dense
              autoFocus
            />

            <ScrollView style={styles.optionsList} showsVerticalScrollIndicator={false}>
              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={theme.colors.primary} />
                  <Text 
                    variant="bodyMedium" 
                    style={[styles.loadingText, { color: theme.colors.onSurfaceVariant }]}
                  >
                    Loading...
                  </Text>
                </View>
              ) : filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.option,
                      { 
                        backgroundColor: value === item.id 
                          ? theme.colors.primaryContainer 
                          : 'transparent'
                      }
                    ]}
                    onPress={() => handleSelect(item)}
                  >
                    <Text 
                      variant="bodyMedium" 
                      style={[
                        styles.optionText,
                        { 
                          color: value === item.id 
                            ? theme.colors.onPrimaryContainer 
                            : theme.colors.onSurface
                        }
                      ]}
                    >
                      {item.name}
                    </Text>
                    {value === item.id && (
                      <Icon
                        name="check"
                        family="MaterialCommunityIcons"
                        size="sm"
                        color={theme.colors.onPrimaryContainer}
                      />
                    )}
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.noDataContainer}>
                  <Icon
                    name="inbox-outline"
                    family="MaterialCommunityIcons"
                    size="lg"
                    color={theme.colors.onSurfaceVariant}
                  />
                  <Text 
                    variant="bodyMedium" 
                    style={[styles.noDataText, { color: theme.colors.onSurfaceVariant }]}
                  >
                    {noDataMessage}
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedText: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  clearButton: {
    padding: 4,
  },
  errorText: {
    marginTop: 4,
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 12,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontWeight: '600',
  },
  searchInput: {
    marginBottom: 16,
  },
  optionsList: {
    maxHeight: 300,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  optionText: {
    flex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  loadingText: {
    marginTop: 8,
  },
  noDataContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  noDataText: {
    marginTop: 8,
    textAlign: 'center',
  },
});

export default SearchableDropdown;
