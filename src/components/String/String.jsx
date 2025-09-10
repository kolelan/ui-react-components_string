import React, { useState, useMemo } from 'react';
import Note from '../Note/Note';
import styles from './String.module.css';

const StringComponent = ({
                             size = 500,
                             openNote = 'E',
                             fretsCount = 24,
                             tonic = 'C',
                             stringColor = '#000000',
                             stringThickness = 2,
                             fretColor = '#cccccc',
                             fretThickness = 1,
                             spacingType = 'fixed',
                             fixedSpacing = 20,
                             scaleLength = 648,
                             pressedFret = 0,
                             noteConfigs = {}, // Конфигурации для каждой ступени
                             onFretClick
                         }) => {
    const [selectedFret, setSelectedFret] = useState(pressedFret);

    // Ноты в порядке следования
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

    // Интервалы от тоники
    const intervals = ['1', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7'];

    // Расчет интервала от тоники
    const calculateInterval = (note) => {
        const tonicIndex = notes.indexOf(tonic);
        const noteIndex = notes.indexOf(note);
        if (tonicIndex === -1 || noteIndex === -1) return '';

        const intervalIndex = (noteIndex - tonicIndex + 12) % 12;
        return intervals[intervalIndex];
    };

    // Получение конфигурации для конкретной ноты
    const getNoteConfig = (note, isPressed) => {
        const interval = calculateInterval(note);

        // Базовая конфигурация
        const baseConfig = {
            showNote: true,
            showNoteName: true,
            showInterval: false,
            size: 30,
            shape: 'circle',
            bgColor: '#ffffff',
            contentColor: '#000000',
            borderColor: '#000000',
            borderSize: 1,
            ...noteConfigs.default // Конфигурация по умолчанию
        };

        // Конфигурация для конкретного интервала
        const intervalConfig = noteConfigs[interval] || {};

        // Конфигурация для зажатого лада
        const pressedConfig = isPressed ? (noteConfigs.pressed || {}) : {};

        // Объединяем конфигурации в порядке приоритета
        return {
            ...baseConfig,
            ...intervalConfig,
            ...pressedConfig,
            content: baseConfig.showNoteName ? note : (baseConfig.showInterval ? interval : '')
        };
    };

    // Расчет позиций ладов
    const fretPositions = useMemo(() => {
        if (spacingType === 'fixed') {
            return Array.from({ length: fretsCount + 1 }, (_, i) => i * fixedSpacing);
        } else {
            const positions = [0];
            for (let i = 1; i <= fretsCount; i++) {
                const position = scaleLength - (scaleLength / Math.pow(2, i / 12));
                positions.push(position);
            }

            const maxPosition = positions[positions.length - 1];
            return positions.map(pos => (pos / maxPosition) * size);
        }
    }, [spacingType, fixedSpacing, scaleLength, fretsCount, size]);

    // Получение ноты для конкретного лада
    const getNoteForFret = (fret) => {
        const openNoteIndex = notes.indexOf(openNote);
        if (openNoteIndex === -1) return 'C';

        const noteIndex = (openNoteIndex + fret) % 12;
        return notes[noteIndex];
    };

    // Обработчик клика по ладу
    const handleFretClick = (fret) => {
        setSelectedFret(fret);
        if (onFretClick) onFretClick(fret);
    };

    return (
        <div className={styles.stringContainer} style={{ width: `${size}px` }}>
            {/* Струна */}
            <div
                className={styles.string}
                style={{
                    backgroundColor: stringColor,
                    height: `${stringThickness}px`,
                    top: '50%',
                    transform: 'translateY(-50%)'
                }}
            />

            {/* Лады и ноты */}
            {fretPositions.map((position, index) => {
                if (index > fretsCount) return null;

                const note = getNoteForFret(index);
                const isPressed = index === selectedFret;
                const noteConfig = getNoteConfig(note, isPressed);

                return (
                    <div key={index} className={styles.fretContainer} style={{ left: `${position}px` }}>
                        {/* Лад */}
                        <div
                            className={styles.fret}
                            style={{
                                backgroundColor: fretColor,
                                width: `${fretThickness}px`,
                                height: '100%'
                            }}
                        />

                        {/* Нота */}
                        {noteConfig.showNote && (
                            <div
                                className={`${styles.notePosition} ${isPressed ? styles.pressed : ''}`}
                                onClick={() => handleFretClick(index)}
                            >
                                <Note {...noteConfig} />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default StringComponent;