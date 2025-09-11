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

    const handleBarLabelConfigChange = (configKey, value) => {
        updateProps({
            barLabelConfig: {
                ...props.barLabelConfig,
                [configKey]: value
            }
        });
    };

    const handleStringLabelConfigChange = (configKey, value) => {
        updateProps({
            stringLabelConfig: {
                ...props.stringLabelConfig,
                [configKey]: value
            }
        });
    };

    const handleFingerNumberConfigChange = (configKey, value) => {
        updateProps({
            fingerNumberConfig: {
                ...props.fingerNumberConfig || {},
                [configKey]: value
            }
        });
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

            <div className={styles.sectionDivider}>
                <h3>String Settings</h3>
            </div>

            <div className={styles.controlGroupRow}>
                <label>String Number:</label>
                <input
                    type="number"
                    min="1"
                    max="6"
                    value={props.stringNumber || 1}
                    onChange={(e) => handleChange('stringNumber', parseInt(e.target.value))}
                />
            </div>
            <div className={styles.controlGroupRow}>
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
            <div className={styles.controlGroupRow}>
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
            <div className={styles.controlGroupRow}>
                <label>Fret Start:</label>
                <input
                    type="range"
                    min="0"
                    max={props.fretsCount}
                    value={props.fretStart || 0}
                    onChange={(e) => handleChange('fretStart', parseInt(e.target.value))}
                />
                <span>{props.fretStart || 0}</span>
            </div>
            <div className={styles.controlGroupRow}>
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
            <div className={styles.controlGroupRow}>
                <label>StrLength:</label>
                <input
                    type="range"
                    min="300"
                    max="1000"
                    value={props.size}
                    onChange={(e) => handleChange('size', parseInt(e.target.value))}
                />
                <span>{props.size}px</span>
            </div>
            <div className={styles.controlGroupRow}>
                <label>Open Note Offset:</label>
                <input
                    type="range"
                    min="-50"
                    max="0"
                    value={props.openNoteOffset || -20}
                    onChange={(e) => handleChange('openNoteOffset', parseInt(e.target.value))}
                />
                <span>{props.openNoteOffset || -20}px</span>
            </div>
            <div className={styles.controlGroupRow}>
                <label>Pressed Count:</label>
                <input
                    type="range"
                    min="0"
                    max="6"
                    value={(props.pressed?.length) || 0}
                    onChange={(e) => {
                        const newCount = parseInt(e.target.value);
                        const current = Array.isArray(props.pressed) ? [...props.pressed] : [];
                        let next = current.slice(0, newCount);
                        while (next.length < newCount) {
                            next.push({ fret: props.fretStart || 0, funger: 0 });
                        }
                        updateProps({ pressed: next });
                    }}
                />
                <span>{(props.pressed?.length) || 0}</span>
            </div>

            {(props.pressed || []).map((item, index) => (
                <div key={`pressed-${index}`} className={styles.groupBox}>
                    <div className={styles.controlGroupRow}>
                        <label>{`Press #${index + 1} - Fret:`}</label>
                        <input
                            type="range"
                            min={props.fretStart || 0}
                            max={props.fretsCount}
                            value={item.fret || (props.fretStart || 0)}
                            onChange={(e) => {
                                const fret = parseInt(e.target.value);
                                const next = (props.pressed || []).map((p, i) => i === index ? { ...p, fret } : p);
                                updateProps({ pressed: next });
                            }}
                        />
                        <span>{item.fret || (props.fretStart || 0)}</span>
                    </div>

                    <div className={styles.controlGroupRow}>
                        <label>{`Press #${index + 1} - Finger:`}</label>
                        <input
                            type="range"
                            min="0"
                            max="4"
                            value={item.funger || 0}
                            onChange={(e) => {
                                const funger = parseInt(e.target.value);
                                const next = (props.pressed || []).map((p, i) => i === index ? { ...p, funger } : p);
                                updateProps({ pressed: next });
                            }}
                        />
                        <span>{item.funger || 0}</span>
                    </div>

                    <div className={styles.controlGroupRow}>
                        <label>{`Press #${index + 1} - Show Interval:`}</label>
                        <input
                            type="checkbox"
                            checked={!!item.showInterval}
                            onChange={(e) => {
                                const showInterval = e.target.checked;
                                const next = (props.pressed || []).map((p, i) => i === index ? { ...p, showInterval } : p);
                                updateProps({ pressed: next });
                            }}
                        />
                    </div>
                </div>
            ))}

            <div className={styles.controlGroupRow}>
                <label>String Color:</label>
                <input
                    type="color"
                    value={props.stringColor}
                    onChange={(e) => handleChange('stringColor', e.target.value)}
                />
            </div>

            <div className={styles.controlGroupRow}>
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

            <div className={styles.controlGroupRow}>
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
                <div className={styles.controlGroupRow}>
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

            <div className={styles.sectionDivider}>
                <h3>Finger Number Configuration</h3>
            </div>

            <div className={styles.controlGroupRow}>
                <label>Vertical Offset:</label>
                <input
                    type="range"
                    min="-50"
                    max="0"
                    value={props.fingerNumberConfig?.offsetY || -25}
                    onChange={(e) => handleFingerNumberConfigChange('offsetY', parseInt(e.target.value))}
                />
                <span>{props.fingerNumberConfig?.offsetY || -25}px</span>
            </div>

            <div className={styles.controlGroupRow}>
                <label>Font Size:</label>
                <input
                    type="range"
                    min="8"
                    max="24"
                    value={props.fingerNumberConfig?.fontSize || 14}
                    onChange={(e) => handleFingerNumberConfigChange('fontSize', parseInt(e.target.value))}
                />
                <span>{props.fingerNumberConfig?.fontSize || 14}px</span>
            </div>

            <div className={styles.controlGroupRow}>
                <label>Color:</label>
                <input
                    type="color"
                    value={props.fingerNumberConfig?.color || '#000000'}
                    onChange={(e) => handleFingerNumberConfigChange('color', e.target.value)}
                />
            </div>

            <div className={styles.sectionDivider}>
                <h3>String Label Configuration</h3>
            </div>

            <div className={styles.controlGroupRow}>
                <label>Show String Label:</label>
                <input
                    type="checkbox"
                    checked={props.stringLabelConfig?.show || false}
                    onChange={(e) => handleStringLabelConfigChange('show', e.target.checked)}
                />
            </div>

            {props.stringLabelConfig?.show && (
                <>
                    <div className={styles.controlGroupRow}>
                        <label>Label Size:</label>
                        <input
                            type="range"
                            min="10"
                            max="30"
                            value={props.stringLabelConfig.size || 20}
                            onChange={(e) => handleStringLabelConfigChange('size', parseInt(e.target.value))}
                        />
                        <span>{props.stringLabelConfig.size || 20}px</span>
                    </div>

                    <div className={styles.controlGroupRow}>
                        <label>Distance from String:</label>
                        <input
                            type="range"
                            min="-100"
                            max="0"
                            value={props.stringLabelConfig.offsetX || -30}
                            onChange={(e) => handleStringLabelConfigChange('offsetX', parseInt(e.target.value))}
                        />
                        <span>{props.stringLabelConfig.offsetX || -30}px</span>
                    </div>

                    <div className={styles.controlGroupRow}>
                        <label>Shape:</label>
                        <select
                            value={props.stringLabelConfig.shape || 'circle'}
                            onChange={(e) => handleStringLabelConfigChange('shape', e.target.value)}
                        >
                            <option value="circle">Circle</option>
                            <option value="square">Square</option>
                            <option value="none">None</option>
                        </select>
                    </div>

                    <div className={styles.controlGroupRow}>
                        <label>Background Color:</label>
                        <input
                            type="color"
                            value={props.stringLabelConfig.bgColor || '#000000'}
                            onChange={(e) => handleStringLabelConfigChange('bgColor', e.target.value)}
                        />
                    </div>

                    <div className={styles.controlGroupRow}>
                        <label>Text Color:</label>
                        <input
                            type="color"
                            value={props.stringLabelConfig.contentColor || '#ffffff'}
                            onChange={(e) => handleStringLabelConfigChange('contentColor', e.target.value)}
                        />
                    </div>
                </>
            )}

            <div className={styles.sectionDivider}>
                <h3>Note Configuration</h3>
            </div>

            <div className={styles.controlGroupRow}>
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

            <div className={styles.controlGroupRow}>
                <label>Show Note:</label>
                <input
                    type="checkbox"
                    checked={getCurrentConfigValue('showNote')}
                    onChange={(e) => handleNoteConfigChange('showNote', e.target.checked)}
                />
            </div>

            <div className={styles.controlGroupRow}>
                <label>Center Note in Fret:</label>
                <input
                    type="checkbox"
                    checked={getCurrentConfigValue('centerInFret')}
                    onChange={(e) => handleNoteConfigChange('centerInFret', e.target.checked)}
                />
            </div>

    <div className={styles.controlGroupRow}>
        <label>Show Intervals Instead of Notes:</label>
        <input
          type="checkbox"
          checked={getCurrentConfigValue('showInterval')}
          onChange={(e) => handleNoteConfigChange('showInterval', e.target.checked)}
        />
      </div>

            <div className={styles.controlGroupRow}>
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

            <div className={styles.controlGroupRow}>
                <label>Text Font Size:</label>
                <input
                    type="range"
                    min="8"
                    max="48"
                    value={getCurrentConfigValue('fontSize') || 16}
                    onChange={(e) => handleNoteConfigChange('fontSize', parseInt(e.target.value))}
                />
                <span>{getCurrentConfigValue('fontSize') || 16}px</span>
            </div>

            <div className={styles.controlGroupRow}>
                <label>Text Offset X:</label>
                <input
                    type="range"
                    min="-50"
                    max="50"
                    value={(getCurrentConfigValue('textOffsetX') ?? 0)}
                    onChange={(e) => handleNoteConfigChange('textOffsetX', parseInt(e.target.value))}
                />
                <span>{(getCurrentConfigValue('textOffsetX') ?? 0)}px</span>
            </div>

            <div className={styles.controlGroupRow}>
                <label>Text Offset Y:</label>
                <input
                    type="range"
                    min="-50"
                    max="50"
                    value={(getCurrentConfigValue('textOffsetY') ?? 0)}
                    onChange={(e) => handleNoteConfigChange('textOffsetY', parseInt(e.target.value))}
                />
                <span>{(getCurrentConfigValue('textOffsetY') ?? 0)}px</span>
            </div>

            <div className={styles.controlGroupRow}>
                <label>Offset X:</label>
                <input
                    type="range"
                    min="-50"
                    max="50"
                    value={(getCurrentConfigValue('offsetX') ?? 0)}
                    onChange={(e) => handleNoteConfigChange('offsetX', parseInt(e.target.value))}
                    disabled={getCurrentConfigValue('centerInFret')}
                />
                <span>{(getCurrentConfigValue('offsetX') ?? 0)}px</span>
            </div>

            <div className={styles.controlGroupRow}>
                <label>Offset Y:</label>
                <input
                    type="range"
                    min="-50"
                    max="50"
                    value={(getCurrentConfigValue('offsetY') ?? 0)}
                    onChange={(e) => handleNoteConfigChange('offsetY', parseInt(e.target.value))}
                    disabled={getCurrentConfigValue('centerInFret')}
                />
                <span>{(getCurrentConfigValue('offsetY') ?? 0)}px</span>
            </div>

            <div className={styles.controlGroupRow}>
                <label>Note Shape:</label>
                <select
                    value={getCurrentConfigValue('shape') || 'circle'}
                    onChange={(e) => handleNoteConfigChange('shape', e.target.value)}
                >
                    <option value="circle">Circle</option>
                    <option value="square">Square</option>
                    <option value="triangle-down">Triangle Down</option>
                    <option value="triangle-up">Triangle Up</option>
                    <option value="triangle-left">Triangle Left</option>
                    <option value="triangle-right">Triangle Right</option>
                    <option value="pentagon">Pentagon</option>
                    <option value="hexagon">Hexagon</option>
                    <option value="heptagon">Heptagon</option>
                    <option value="octagon">Octagon</option>
                    <option value="diamond">Diamond</option>
                </select>
            </div>

            <div className={styles.controlGroupRow}>
                <label>Background Color:</label>
                <input
                    type="color"
                    value={getCurrentConfigValue('bgColor') || '#ffffff'}
                    onChange={(e) => handleNoteConfigChange('bgColor', e.target.value)}
                />
            </div>

            <div className={styles.controlGroupRow}>
                <label>Content Color:</label>
                <input
                    type="color"
                    value={getCurrentConfigValue('contentColor') || '#000000'}
                    onChange={(e) => handleNoteConfigChange('contentColor', e.target.value)}
                />
            </div>

            <div className={styles.controlGroupRow}>
                <label>Text Rotation:</label>
                <input
                    type="range"
                    min="-180"
                    max="180"
                    value={(getCurrentConfigValue('contentRotate') ?? 0)}
                    onChange={(e) => handleNoteConfigChange('contentRotate', parseInt(e.target.value))}
                />
                <span>{(getCurrentConfigValue('contentRotate') ?? 0)}°</span>
            </div>

            <div className={styles.controlGroupRow}>
                <label>Preset:</label>
                <div>
                    <button type="button" onClick={() => handleNoteConfigChange('contentRotate', 0)}>0°</button>{' '}
                    <button type="button" onClick={() => handleNoteConfigChange('contentRotate', 90)}>90°</button>{' '}
                    <button type="button" onClick={() => handleNoteConfigChange('contentRotate', 180)}>180°</button>{' '}
                    <button type="button" onClick={() => handleNoteConfigChange('contentRotate', 270)}>270°</button>
                </div>
            </div>

            <div className={styles.controlGroupRow}>
                <label>Border Color:</label>
                <input
                    type="color"
                    value={getCurrentConfigValue('borderColor') || '#000000'}
                    onChange={(e) => handleNoteConfigChange('borderColor', e.target.value)}
                />
            </div>

            <div className={styles.controlGroupRow}>
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
                <h3>Bar Labels Configuration</h3>
            </div>

            <div className={styles.controlGroupRow}>
                <label>Show Bar Labels:</label>
                <input
                    type="checkbox"
                    checked={props.barLabelConfig?.show || false}
                    onChange={(e) => handleBarLabelConfigChange('show', e.target.checked)}
                />
            </div>

            {props.barLabelConfig?.show && (
                <>
                    <div className={styles.controlGroup}>
                        <label>Frets to Show:</label>
                        <input
                            type="text"
                            placeholder="e.g., 3,5,7,9,12,15,17,19,21,24"
                            value={props.barLabelConfig.fretsToShow || ''}
                            onChange={(e) => handleBarLabelConfigChange('fretsToShow', e.target.value)}
                        />
                        <small>Comma-separated fret numbers</small>
                    </div>

                    <div className={styles.controlGroupRow}>
                        <label>Label Size:</label>
                        <input
                            type="range"
                            min="8"
                            max="24"
                            value={props.barLabelConfig.fontSize || 12}
                            onChange={(e) => handleBarLabelConfigChange('fontSize', parseInt(e.target.value))}
                        />
                        <span>{props.barLabelConfig.fontSize || 12}px</span>
                    </div>

                    <div className={styles.controlGroupRow}>
                        <label>Pattern:</label>
                        <select
                            value={props.barLabelConfig.pattern || 'numbers'}
                            onChange={(e) => handleBarLabelConfigChange('pattern', e.target.value)}
                        >
                            <option value="numbers">Numbers</option>
                            <option value="dots">Dots</option>
                        </select>
                    </div>

                    {(props.barLabelConfig.pattern || 'numbers') === 'numbers' && (
                        <div className={styles.controlGroupRow}>
                            <label>Number Format:</label>
                            <select
                                value={props.barLabelConfig.numberFormat || 'arabic'}
                                onChange={(e) => handleBarLabelConfigChange('numberFormat', e.target.value)}
                            >
                                <option value="arabic">Arabic (1,2,3...)</option>
                                <option value="roman">Roman (I,II,III...)</option>
                            </select>
                        </div>
                    )}

                    {(props.barLabelConfig.pattern || 'numbers') === 'dots' && (
                        <>
                            <div className={styles.controlGroupRow}>
                                <label>Dot Size:</label>
                                <input
                                    type="range"
                                    min="4"
                                    max="24"
                                    value={props.barLabelConfig.dotSize || 8}
                                    onChange={(e) => handleBarLabelConfigChange('dotSize', parseInt(e.target.value))}
                                />
                                <span>{props.barLabelConfig.dotSize || 8}px</span>
                            </div>

                            <div className={styles.controlGroupRow}>
                                <label>Dot Color:</label>
                                <input
                                    type="color"
                                    value={props.barLabelConfig.dotColor || '#000000'}
                                    onChange={(e) => handleBarLabelConfigChange('dotColor', e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    <div className={styles.controlGroupRow}>
                        <label>Distance from String:</label>
                        <input
                            type="range"
                            min="-50"
                            max="50"
                            value={props.barLabelConfig.distanceFromString || 20}
                            onChange={(e) => handleBarLabelConfigChange('distanceFromString', parseInt(e.target.value))}
                        />
                        <span>{props.barLabelConfig.distanceFromString || 20}px</span>
                    </div>

                    <div className={styles.controlGroupRow}>
                        <label>Position:</label>
                        <select
                            value={props.barLabelConfig.position || 'between'}
                            onChange={(e) => handleBarLabelConfigChange('position', e.target.value)}
                        >
                            <option value="between">Between Frets</option>
                            <option value="above">Above Fret</option>
                        </select>
                    </div>

                    <div className={styles.controlGroupRow}>
                        <label>Label Color:</label>
                        <input
                            type="color"
                            value={props.barLabelConfig.color || '#000000'}
                            onChange={(e) => handleBarLabelConfigChange('color', e.target.value)}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Controls;