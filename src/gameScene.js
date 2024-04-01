// GameScene.js
import Phaser from 'phaser';
import * as braincadeSDK from './braincadeSDK';

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Preload assets here
        braincadeSDK.addEventListenersPhaser.bind(this)();
    }

    create() {

        // Add pause text
        this.pauseText = this.add.text(
            this.sys.canvas.width - 100,
            20,
            'Pause',
            {
                fontSize: '24px',
                fill: '#fff',
                backgroundColor: '#000',
                padding: {
                    x: 10,
                    y: 5
                }
            }
        );
        this.pauseText.setInteractive();
        this.pauseText.on('pointerdown', braincadeSDK.handlePauseGame.bind(this), this);

        // Create a rectangle
        this.rectangle = this.add.rectangle(400, 300, 100, 50, 0x00ff00);

        // Enable cursor keys for input
        this.cursors = this.input.keyboard.createCursorKeys();

        // Event listener for 'keydown' event
        this.input.keyboard.on('keydown', this.handleKeyDown, this);
    }

    update() {
        if (this.cursors.left.isDown) {
            this.rectangle.x -= 5;
        }

        if (this.cursors.right.isDown) {
            this.rectangle.x += 5;
        }
    }

    handleKeyDown(event) {
        if (event.key === 'g' || event.key === 'G') {
            braincadeSDK.initiateGameOver.bind(this)();
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: [GameScene]
};

export default config;
