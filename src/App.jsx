import React, { useState } from 'react';
import StringComponent from './components/String/String';
import Controls from './components/Controls/Controls';
import styles from './App.module.css';

function App() {
    const [stringProps, setStringProps] = useState({
        size: 800,
        openNote: 'E',
        fretsCount: 12,
        tonic: 'C',
        stringColor: '#000000',
        stringThickness: 2,
        fretColor: '#cccccc',
        fretThickness: 1,
        spacingType: 'fixed',
        fixedSpacing: 30,
        scaleLength: 648,
        pressedFret: 0,
        noteConfigs: {
            default: {
                showNote: true,
                showNoteName: true,
                showInterval: false,
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