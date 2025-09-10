import React, { useState, useMemo, useEffect } from 'react';
import Note from '../Note/Note';
import styles from './String.module.css';

const StringComponent = ({
                             size = 500,
                             stringNumber = 1,
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
                             fingerNumber = 0,
                             openNoteOffset = -20,
                             noteConfigs = {},
                             barLabelConfig = {},
                             stringLabelConfig = {},
                             fingerNumberConfig = {},
                             onFretClick
                         }) => {
    const [selectedFret, setSelectedFret] = useState(pressedFret);
    const [selectedFinger, setSelectedFinger] = useState(fingerNumber);

    // Обновляем внутреннее состояние при изменении пропсов pressedFret и fingerNumber
    useEffect(() => {
        setSelectedFret(pressedFret);
        setSelectedFinger(fingerNumber);
    }, [pressedFret, fingerNumber]);

    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const intervals = ['1', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7'];

    const toRoman = (num) => {
        const romanNumerals = [
            '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
            'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX',
            'XXI', 'XXII', 'XXIII', 'XXIV'
        ];
        return romanNumerals[num] || num.toString();
    };

    const calculateInterval = (note) => {
        const tonicIndex = notes.indexOf(tonic);
        const noteIndex = notes.indexOf(note);
        if (tonicIndex === -1 || noteIndex === -1) return '';

        const intervalIndex = (noteIndex - tonicIndex + 12) % 12;
        return intervals[intervalIndex];
    };

    const getNoteConfig = (note, isPressed) => {
        const interval = calculateInterval(note);

        const baseConfig = {
            showNote: true,
            showInterval: false,
            centerInFret: false,
            size: 30,
            shape: 'circle',
            bgColor: '#ffffff',
            contentColor: '#000000',
            borderColor: '#000000',
            borderSize: 1,
            ...noteConfigs.default
        };

        const intervalConfig = noteConfigs[interval] || {};
        const pressedConfig = isPressed ? (noteConfigs.pressed || {}) : {};

        // Определяем что показывать: ноту или интервал
        const content = baseConfig.showInterval ? interval : note;

        return {
            ...baseConfig,
            ...intervalConfig,
            ...pressedConfig,
            content: content
        };
    };

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

    const barLabelPositions = useMemo(() => {
        if (!barLabelConfig.show) return [];

        const positions = [];
        for (let i = 1; i < fretPositions.length; i++) {
            const middlePosition = (fretPositions[i] + fretPositions[i - 1]) / 2;
            positions.push({ position: middlePosition, fret: i });
        }
        return positions;
    }, [fretPositions, barLabelConfig.show]);

    const notePositions = useMemo(() => {
        const positions = [];

        if (fretPositions.length > 0) {
            // Открытая нота (лад 0) со смещением влево
            const openNotePosition = fretPositions[0] + (openNoteOffset || -20);
            positions.push({ position: openNotePosition, fret: 0 });
        }

        // Остальные ноты (между ладами)
        for (let i = 1; i < fretPositions.length; i++) {
            const middlePosition = (fretPositions[i] + fretPositions[i - 1]) / 2;
            positions.push({ position: middlePosition, fret: i });
        }

        return positions;
    }, [fretPositions, openNoteOffset]);

    const getNoteForFret = (fret) => {
        const openNoteIndex = notes.indexOf(openNote);
        if (openNoteIndex === -1) return 'C';

        const noteIndex = (openNoteIndex + fret) % 12;
        return notes[noteIndex];
    };

    const handleFretClick = (fret) => {
        setSelectedFret(fret);
        if (onFretClick) onFretClick(fret);
    };

    const fretsToShow = barLabelConfig.fretsToShow
        ? barLabelConfig.fretsToShow.split(',').map(f => parseInt(f.trim())).filter(f => !isNaN(f))
        : [];

    return (
        <div className={styles.stringContainer} style={{ width: `${size}px` }}>
            {/* Метка номера струны */}
            {stringLabelConfig?.show && (
                <div
                    className={styles.stringLabel}
                    style={{
                        left: `${stringLabelConfig.offsetX || -30}px`,
                        top: '50%',
                        transform: 'translateY(-50%)'
                    }}
                >
                    <Note
                        size={stringLabelConfig.size || 20}
                        shape={stringLabelConfig.shape || 'circle'}
                        bgColor={stringLabelConfig.bgColor || '#000000'}
                        contentColor={stringLabelConfig.contentColor || '#ffffff'}
                        content={stringNumber.toString()}
                        showShape={stringLabelConfig.shape !== 'none'}
                    />
                </div>
            )}

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

            {/* Лады */}
            {fretPositions.map((position, index) => (
                <div
                    key={`fret-${index}`}
                    className={styles.fret}
                    style={{
                        left: `${position}px`,
                        backgroundColor: fretColor,
                        width: `${fretThickness}px`,
                        height: '100%'
                    }}
                />
            ))}

            {/* Ноты */}
            {notePositions.map(({ position, fret }) => {
                const note = getNoteForFret(fret);
                const isPressed = fret === selectedFret;
                const noteConfig = getNoteConfig(note, isPressed);

                if (!noteConfig.showNote) return null;

                return (
                    <div
                        key={`note-${fret}`}
                        className={`${styles.notePosition} ${isPressed ? styles.pressed : ''}`}
                        style={{ left: `${position}px` }}
                        onClick={() => handleFretClick(fret)}
                    >
                        <Note {...noteConfig} />
                        {/* Отображение номера пальца для нажатого лада */}
                        {isPressed && selectedFinger > 0 && (
                            <div
                                className={styles.fingerNumber}
                                style={{
                                    position: 'absolute',
                                    top: `${fingerNumberConfig.offsetY || -25}px`,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    fontSize: `${fingerNumberConfig.fontSize || 14}px`,
                                    color: fingerNumberConfig.color || '#000000',
                                    fontWeight: 'bold'
                                }}
                            >
                                {selectedFinger}
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Метки ладов */}
            {barLabelConfig.show && barLabelPositions.map(({ position, fret }) => {
                if (fretsToShow.length > 0 && !fretsToShow.includes(fret)) return null;

                const labelText = barLabelConfig.numberFormat === 'roman'
                    ? toRoman(fret)
                    : fret.toString();

                const labelStyle = {
                    fontSize: `${barLabelConfig.fontSize || 12}px`,
                    color: barLabelConfig.color || '#000000'
                };

                return (
                    <div
                        key={`label-${fret}`}
                        className={styles.barLabel}
                        style={{
                            left: `${position}px`,
                            [barLabelConfig.position === 'above' ? 'bottom' : 'top']:
                                `${(barLabelConfig.distanceFromString || 20) + (stringThickness / 2)}px`,
                            transform: barLabelConfig.position === 'above'
                                ? 'translate(-50%, 100%)'
                                : 'translate(-50%, 0)'
                        }}
                    >
                        <span style={labelStyle}>{labelText}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default StringComponent;