import React from 'react';
import styles from './Note.module.css';

const Note = ({
                  size = 100,
                  shape = 'circle',
                  bgColor = '#ffffff',
                  contentColor = '#000000',
                  borderColor = '#000000',
                  borderSize = 1,
                  bgOpacity = 1,
                  contentOpacity = 1,
                  content = 'Tap',
                  fontSize = 16,
                  offsetX = 0,
                  offsetY = 0,
                  contentOffsetX = undefined,
                  contentOffsetY = undefined,
                  borderEnabled = true,
                  showShape = true, // Новый параметр для отображения фигуры
                  contentRotate = 0,
                  className = ''
              }) => {
    const containerStyle = {
        width: showShape ? `${size}px` : 'auto',
        height: showShape ? `${size}px` : 'auto',
        backgroundColor: showShape ? bgColor : 'transparent',
        opacity: bgOpacity
    };

    // Добавляем обводку только если она включена и фигура отображается
    if (showShape && borderEnabled && borderSize > 0) {
        containerStyle.border = `${borderSize}px solid ${borderColor}`;
    }

    const contentStyle = {
        color: contentColor,
        opacity: contentOpacity,
        fontSize: `${fontSize}px`,
        transform: `translate(${(contentOffsetX ?? offsetX)}px, ${(contentOffsetY ?? offsetY)}px) rotate(${contentRotate}deg)`
    };

    const getShapeClass = () => {
        if (!showShape) return styles.contentOnly;

        switch (shape) {
            case 'circle': return styles.circle;
            case 'square': return styles.square;
            case 'triangle-down': return styles.triangleDown;
            case 'triangle-up': return styles.triangleUp;
            case 'triangle-left': return styles.triangleLeft;
            case 'triangle-right': return styles.triangleRight;
            case 'pentagon': return styles.pentagon;
            case 'hexagon': return styles.hexagon;
            case 'heptagon': return styles.heptagon;
            case 'octagon': return styles.octagon;
            case 'diamond': return styles.diamond;
            default: return styles.circle;
        }
    };

    return (
        <div
            className={`${styles.tapContainer} ${getShapeClass()} ${className}`}
            style={containerStyle}
        >
            <div
                className={styles.content}
                style={contentStyle}
            >
                {content}
            </div>
        </div>
    );
};

export default Note;