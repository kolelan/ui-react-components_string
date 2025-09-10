import React, { useState } from 'react';
import styles from './Controls.module.css';

const Controls = ({ props, updateProps }) => {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const intervals = ['1', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7'];

    const [selectedInterval, setSelectedInterval] = useState('default');

    const handleChange = (key, value) => {
        updateProps({ [key]: value });
    };

    const handleNoteConfigChange = (configKey, value, interval = selectedInterval) => {
        const updatedConfigs = { ...props.noteConfigs };

        if (!updatedConfigs[interval]) {
            updatedConfigs[interval] = {};
        }

        updatedConfigs[interval][configKey] = value;
        updateProps({ noteConfigs: updatedConfigs });
    };

    const getCurrentConfigValue = (configKey, interval = selectedInterval) => {
        if (interval === 'default') {
            return props.noteConfigs.default?.[configKey] ?? '';
        }
        return props.noteConfigs[interval]?.[configKey] ?? '';
    };

    return (
        <div className={styles.controls}>
            <h2>Controls</h2>

            <div className={styles.controlGroup}>
                <label>Open Note:</label>
                <select
                    value={props.openNote}
                    onChange={(e) => handleChange('openNote', e.target.value)}
                >
                    {notes.map(note => (
                        <option key={note} value={note}>{note}</option>
                    ))}
                </select>
            </div>

            <div className={styles.controlGroup}>
                <label>Tonic:</label>
                <select
                    value={props.tonic}
                    onChange={(e) => handleChange('tonic', e.target.value)}
                >
                    {notes.map(note => (
                        <option key={note} value={note}>{note}</option>
                    ))}
                </select>
            </div>

            <div className={styles.controlGroup}>
                <label>Frets Count:</label>
                <input
                    type="range"
                    min="3"
                    max="24"
                    value={props.fretsCount}
                    onChange={(e) => handleChange('fretsCount', parseInt(e.target.value))}
                />
                <span>{props.fretsCount}</span>
            </div>

            <div className={styles.sectionDivider}>
                <h3>Note Configuration</h3>
            </div>

            <div className={styles.controlGroup}>
                <label>Configure for:</label>
                <select
                    value={selectedInterval}
                    onChange={(e) => setSelectedInterval(e.target.value)}
                >
                    <option value="default">Default</option>
                    <option value="pressed">Pressed Fret</option>
                    {intervals.map(interval => (
                        <option key={interval} value={interval}>{interval}</option>
                    ))}
                </select>
            </div>

            <div className={styles.controlGroup}>
                <label>Show Note:</label>
                <input
                    type="checkbox"
                    checked={getCurrentConfigValue('showNote')}
                    onChange={(e) => handleNoteConfigChange('showNote', e.target.checked)}
                />
            </div>

            <div className={styles.controlGroup}>
                <label>Show Note Name:</label>
                <input
                    type="checkbox"
                    checked={getCurrentConfigValue('showNoteName')}
                    onChange={(e) => handleNoteConfigChange('showNoteName', e.target.checked)}
                />
            </div>

            <div className={styles.controlGroup}>
                <label>Show Interval:</label>
                <input
                    type="checkbox"
                    checked={getCurrentConfigValue('showInterval')}
                    onChange={(e) => handleNoteConfigChange('showInterval', e.target.checked)}
                />
            </div>

            <div className={styles.controlGroup}>
                <label>Note Size:</label>
                <input
                    type="range"
                    min="10"
                    max="50"
                    value={getCurrentConfigValue('size') || 30}
                    onChange={(e) => handleNoteConfigChange('size', parseInt(e.target.value))}
                />
                <span>{getCurrentConfigValue('size') || 30}px</span>
            </div>

            <div className={styles.controlGroup}>
                <label>Note Shape:</label>
                <select
                    value={getCurrentConfigValue('shape') || 'circle'}
                    onChange={(e) => handleNoteConfigChange('shape', e.target.value)}
                >
                    <option value="circle">Circle</option>
                    <option value="square">Square</option>
                    <option value="triangle-down">Triangle Down</option>
                    <option value="triangle-up">Triangle Up</option>
                    <option value="diamond">Diamond</option>
                </select>
            </div>

            <div className={styles.controlGroup}>
                <label>Background Color:</label>
                <input
                    type="color"
                    value={getCurrentConfigValue('bgColor') || '#ffffff'}
                    onChange={(e) => handleNoteConfigChange('bgColor', e.target.value)}
                />
            </div>

            <div className={styles.controlGroup}>
                <label>Content Color:</label>
                <input
                    type="color"
                    value={getCurrentConfigValue('contentColor') || '#000000'}
                    onChange={(e) => handleNoteConfigChange('contentColor', e.target.value)}
                />
            </div>

            <div className={styles.controlGroup}>
                <label>Border Color:</label>
                <input
                    type="color"
                    value={getCurrentConfigValue('borderColor') || '#000000'}
                    onChange={(e) => handleNoteConfigChange('borderColor', e.target.value)}
                />
            </div>

            <div className={styles.controlGroup}>
                <label>Border Size:</label>
                <input
                    type="range"
                    min="0"
                    max="5"
                    value={getCurrentConfigValue('borderSize') || 1}
                    onChange={(e) => handleNoteConfigChange('borderSize', parseInt(e.target.value))}
                />
                <span>{getCurrentConfigValue('borderSize') || 1}px</span>
            </div>

            <div className={styles.sectionDivider}>
                <h3>String Settings</h3>
            </div>

            <div className={styles.controlGroup}>
                <label>String Color:</label>
                <input
                    type="color"
                    value={props.stringColor}
                    onChange={(e) => handleChange('stringColor', e.target.value)}
                />
            </div>

            <div className={styles.controlGroup}>
                <label>String Thickness:</label>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={props.stringThickness}
                    onChange={(e) => handleChange('stringThickness', parseInt(e.target.value))}
                />
                <span>{props.stringThickness}px</span>
            </div>

            <div className={styles.controlGroup}>
                <label>Spacing Type:</label>
                <select
                    value={props.spacingType}
                    onChange={(e) => handleChange('spacingType', e.target.value)}
                >
                    <option value="fixed">Fixed</option>
                    <option value="scale">Scale-based</option>
                </select>
            </div>

            {props.spacingType === 'fixed' && (
                <div className={styles.controlGroup}>
                    <label>Fixed Spacing:</label>
                    <input
                        type="range"
                        min="10"
                        max="50"
                        value={props.fixedSpacing}
                        onChange={(e) => handleChange('fixedSpacing', parseInt(e.target.value))}
                    />
                    <span>{props.fixedSpacing}px</span>
                </div>
            )}
        </div>
    );
};

export default Controls;