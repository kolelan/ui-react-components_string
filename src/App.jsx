import React, { useState } from 'react';
import StringComponent from './components/String/String';
import Controls from './components/Controls/Controls';
import styles from './App.module.css';

function App() {
    const [stringProps, setStringProps] = useState({
        size: 800,
        stringNumber: 1,
        openNote: 'E',
        fretsCount: 12,
        tonic: 'C',
        stringColor: '#000000',
        stringThickness: 2,
        fretColor: '#cccccc',
        fretThickness: 1,
        spacingType: 'scale',
        fixedSpacing: 30,
        scaleLength: 648,
        pressedFret: 0,
        fingerNumber: 0,
        openNoteOffset: -20,
        noteConfigs: {
            default: {
                showNote: true,
                showInterval: false,
                centerInFret: false,
                size: 30,
                shape: 'circle',
                bgColor: '#ffffff',
                contentColor: '#000000',
                borderColor: '#000000',
                borderSize: 1
            },
            pressed: {
                bgColor: '#ff0000',
                contentColor: '#ffffff'
            },
            '1': { bgColor: '#ff9999' },
            'b2': { bgColor: '#ffcc99' },
            '2': { bgColor: '#ffff99' },
            'b3': { bgColor: '#ccff99' },
            '3': { bgColor: '#99ff99' },
            '4': { bgColor: '#99ffcc' },
            'b5': { bgColor: '#99ffff' },
            '5': { bgColor: '#99ccff' },
            'b6': { bgColor: '#9999ff' },
            '6': { bgColor: '#cc99ff' },
            'b7': { bgColor: '#ff99ff' },
            '7': { bgColor: '#ff99cc' }
        },
        barLabelConfig: {
            show: false,
            fretsToShow: '3,5,7,9,12,15,17,19,21,24',
            fontSize: 12,
            numberFormat: 'arabic',
            distanceFromString: 20,
            position: 'between',
            color: '#000000'
        },
        stringLabelConfig: {
            show: true,
            size: 20,
            offsetX: -70,
            shape: 'circle',
            bgColor: '#000000',
            contentColor: '#ffffff'
        },
        fingerNumberConfig: {
            offsetY: -25,
            fontSize: 14,
            color: '#000000'
        }
    });

    const updateStringProps = (newProps) => {
        setStringProps({ ...stringProps, ...newProps });
    };

    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <h1>String Component Tester</h1>
            </header>
            <div className={styles.content}>
                <div className={styles.leftPanel}>
                    <StringComponent {...stringProps} />
                </div>
                <div className={styles.rightPanel}>
                    <Controls props={stringProps} updateProps={updateStringProps} />
                </div>
            </div>
        </div>
    );
}

export default App;