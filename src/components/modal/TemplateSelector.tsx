import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BannerTemplate } from '../../types';

interface TemplateSelectorProps {
  templates: BannerTemplate[];
  selectedTemplate: BannerTemplate;
  onSelectTemplate: (template: BannerTemplate) => void;
  title: string;
  darkMode?: boolean;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  selectedTemplate,
  onSelectTemplate,
  title,
  darkMode,
}) => {
  return (
    <View style={styles.templateSection}>
      <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.templateList}>
          {templates.map((template) => (
            <TouchableOpacity
              key={template.id}
              style={[
                styles.templateItem,
                selectedTemplate.id === template.id && styles.templateItemSelected,
                darkMode && styles.darkTemplateItem,
              ]}
              onPress={() => onSelectTemplate(template)}
            >
              <LinearGradient
                colors={template.colors as [string, string, ...string[]]}
                style={styles.templatePreview}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
              <Text
                style={[
                  styles.templateName,
                  darkMode && styles.darkText,
                  selectedTemplate.id === template.id && styles.templateNameSelected,
                ]}
              >
                {template.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  templateSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    letterSpacing: -0.3,
    marginBottom: 16,
  },
  darkText: {
    color: '#fff',
  },
  templateList: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 4,
  },
  templateItem: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: '#f8f9fa',
    minWidth: 80,
  },
  darkTemplateItem: {
    backgroundColor: '#2a2a2a',
  },
  templateItemSelected: {
    borderColor: '#007AFF',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  templatePreview: {
    width: 60,
    height: 40,
    borderRadius: 8,
    marginBottom: 8,
  },
  templateName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  templateNameSelected: {
    color: '#007AFF',
  },
});
