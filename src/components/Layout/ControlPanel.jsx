import React, { useState } from 'react';
import styles from './Layout.module.css';

const ControlPanel = ({ onSettingsChange, settings }) => {
    const [localSettings, setLocalSettings] = useState(settings);

    const handleChange = (key, value) => {
        const newSettings = { ...localSettings, [key]: value };
        setLocalSettings(newSettings);
        onSettingsChange(newSettings);
    };

    const colorOptions = ['red', 'green', 'yellow', 'blue', 'purple', 'orange', 'black', '#ff00ff', '#00ffff'];
    const shapeOptions = [
        { value: 'circle', label: 'Круг' },
        { value: 'square', label: 'Квадрат' },
        { value: 'triangle-down', label: 'Треугольник ▼' },
        { value: 'triangle-up', label: 'Треугольник ▲' },
        { value: 'diamond', label: 'Ромб' }
    ];

    return (
        <div className={styles.controlPanel}>
            <h2>Управление компонентом</h2>

            <div className={styles.controlGroup}>
                <label>Размер (px):</label>
                <input
                    type="range"
                    min="50"
                    max="300"
                    value={localSettings.size}
                    onChange={(e) => handleChange('size', parseInt(e.target.value))}
                />
                <span>{localSettings.size}px</span>
            </div>

            <div className={styles.controlGroup}>
                <label>
                    <input
                        type="checkbox"
                        checked={localSettings.showShape !== false}
                        onChange={(e) => handleChange('showShape', e.target.checked)}
                    />
                    Показывать фигуру
                </label>
            </div>

            <div className={styles.controlGroup}>
                <label>Форма:</label>
                <select
                    value={localSettings.shape}
                    onChange={(e) => handleChange('shape', e.target.value)}
                >
                    {shapeOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.controlGroup}>
                <label>Цвет фона:</label>
                <select
                    value={localSettings.bgColor}
                    onChange={(e) => handleChange('bgColor', e.target.value)}
                >
                    {colorOptions.map(color => (
                        <option key={color} value={color}>{color}</option>
                    ))}
                </select>
            </div>

            <div className={styles.controlGroup}>
                <label>Прозрачность фона:</label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={localSettings.bgOpacity}
                    onChange={(e) => handleChange('bgOpacity', parseFloat(e.target.value))}
                />
                <span>{localSettings.bgOpacity}</span>
            </div>

            {/* Переключатель обводки */}
            <div className={styles.controlGroup}>
                <label>
                    <input
                        type="checkbox"
                        checked={localSettings.borderEnabled !== false}
                        onChange={(e) => handleChange('borderEnabled', e.target.checked)}
                    />
                    Включить обводку
                </label>
            </div>

            {localSettings.borderEnabled !== false && (
                <>
                    <div className={styles.controlGroup}>
                        <label>Цвет обводки:</label>
                        <select
                            value={localSettings.borderColor}
                            onChange={(e) => handleChange('borderColor', e.target.value)}
                        >
                            {colorOptions.map(color => (
                                <option key={color} value={color}>{color}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.controlGroup}>
                        <label>Размер обводки:</label>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={localSettings.borderSize}
                            onChange={(e) => handleChange('borderSize', parseInt(e.target.value))}
                        />
                        <span>{localSettings.borderSize}px</span>
                    </div>
                </>
            )}

            <div className={styles.controlGroup}>
                <label>Цвет содержимого:</label>
                <select
                    value={localSettings.contentColor}
                    onChange={(e) => handleChange('contentColor', e.target.value)}
                >
                    {colorOptions.map(color => (
                        <option key={color} value={color}>{color}</option>
                    ))}
                </select>
            </div>

            <div className={styles.controlGroup}>
                <label>Прозрачность содержимого:</label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={localSettings.contentOpacity}
                    onChange={(e) => handleChange('contentOpacity', parseFloat(e.target.value))}
                />
                <span>{localSettings.contentOpacity}</span>
            </div>

            <div className={styles.controlGroup}>
                <label>Содержимое:</label>
                <input
                    type="text"
                    value={localSettings.content}
                    onChange={(e) => handleChange('content', e.target.value)}
                />
            </div>

            <div className={styles.controlGroup}>
                <label>Размер текста:</label>
                <input
                    type="range"
                    min="8"
                    max="48"
                    value={localSettings.fontSize}
                    onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
                />
                <span>{localSettings.fontSize}px</span>
            </div>

            <div className={styles.controlGroup}>
                <label>Смещение по X (px):</label>
                <input
                    type="range"
                    min="-50"
                    max="50"
                    value={localSettings.offsetX || 0}
                    onChange={(e) => handleChange('offsetX', parseInt(e.target.value))}
                />
                <span>{localSettings.offsetX || 0}px</span>
            </div>

            <div className={styles.controlGroup}>
                <label>Смещение по Y (px):</label>
                <input
                    type="range"
                    min="-50"
                    max="50"
                    value={localSettings.offsetY || 0}
                    onChange={(e) => handleChange('offsetY', parseInt(e.target.value))}
                />
                <span>{localSettings.offsetY || 0}px</span>
            </div>
        </div>
    );
};

export default ControlPanel;