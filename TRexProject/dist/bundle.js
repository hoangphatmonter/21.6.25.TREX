/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GRAVITY\": () => (/* binding */ GRAVITY)\n/* harmony export */ });\n/* harmony import */ var _classes_Dino__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/Dino */ \"./src/classes/Dino.ts\");\n/* harmony import */ var _classes_Cactus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/Cactus */ \"./src/classes/Cactus.ts\");\n/* harmony import */ var _classes_Bird__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/Bird */ \"./src/classes/Bird.ts\");\n/* harmony import */ var _classes_Ground__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./classes/Ground */ \"./src/classes/Ground.ts\");\n/* harmony import */ var _classes_ScoreCounter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./classes/ScoreCounter */ \"./src/classes/ScoreCounter.ts\");\n/* harmony import */ var _classes_GameOverScene__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./classes/GameOverScene */ \"./src/classes/GameOverScene.ts\");\n/* harmony import */ var _classes_StartScene__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./classes/StartScene */ \"./src/classes/StartScene.ts\");\n/* harmony import */ var _classes_Background__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./classes/Background */ \"./src/classes/Background.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n// get the canvas of the screen\r\nlet canvas = document.getElementsByTagName('canvas')[0];\r\nlet c = canvas.getContext('2d');\r\nvar GameState;\r\n(function (GameState) {\r\n    GameState[GameState[\"READY\"] = 0] = \"READY\";\r\n    GameState[GameState[\"PLAYING\"] = 1] = \"PLAYING\";\r\n    GameState[GameState[\"OVER\"] = 2] = \"OVER\";\r\n})(GameState || (GameState = {}));\r\n;\r\nconst GRAVITY = 700; // px/s^2\r\nlet GAMESPEED = 200; // px/s\r\n// Button status\r\nlet btnPressed;\r\nlet gameState;\r\n// create background\r\nlet bg;\r\n// create player\r\nlet dino;\r\n// create ground\r\nlet ground;\r\n// create score counter\r\nconst scoreCounter = new _classes_ScoreCounter__WEBPACK_IMPORTED_MODULE_4__.ScoreCounter(20, 20, 15);\r\n// list of cactuses\r\nlet enemies;\r\n// game start box\r\nlet startScene;\r\n// game over box\r\nlet gameOverScene;\r\nlet lastTime;\r\nlet animationId;\r\ninit(window.innerWidth, window.innerHeight, GameState.READY);\r\n// time to push more cactus\r\nlet cactusSpawnTime = genCacTime();\r\nfunction loop() {\r\n    animationId = requestAnimationFrame(loop);\r\n    const time = window.performance.now();\r\n    const delta = time - lastTime;\r\n    processInput();\r\n    update(time, delta); // could stop the game\r\n    render();\r\n    lastTime = time;\r\n}\r\nfunction processInput() {\r\n    // check if user press space\r\n    dino.setBtnPressed(btnPressed);\r\n}\r\nfunction update(time, delta) {\r\n    if (gameState === GameState.PLAYING) {\r\n        // some code put here if window resize\r\n        // update bg\r\n        bg.update(delta);\r\n        // update ground\r\n        ground.update(delta, canvas);\r\n        // update dino state\r\n        dino.update(delta, ground);\r\n        // update score\r\n        let curScore = scoreCounter.getScore();\r\n        scoreCounter.setScore(curScore + Math.floor(GAMESPEED * delta / 1000));\r\n        // update cactus state\r\n        for (let i = 0; i < enemies.length; i++) {\r\n            enemies[i].update(delta);\r\n            // check collision\r\n            // destroy if out of scene\r\n            if (enemies[i].getBotRightPosition()[0] < 0) {\r\n                enemies.splice(i, 1);\r\n                i--;\r\n                continue;\r\n            }\r\n            // collision happen when cactus enter the Dino area\r\n            let cLeftX = enemies[i].getTopLeftPosition()[0];\r\n            let cRightX = enemies[i].getTopRightPosition()[0];\r\n            let cTopY = enemies[i].getTopLeftPosition()[1];\r\n            let cBotY = enemies[i].getBotLeftPosition()[1];\r\n            let dLeftX = dino.getBotLeftPosition()[0];\r\n            let dRightX = dino.getBotRightPosition()[0];\r\n            let dTopY = dino.getTopLeftPosition()[1];\r\n            let dBotY = dino.getBotLeftPosition()[1];\r\n            if (dLeftX < cRightX && // c in front of d\r\n                dRightX > cLeftX && // may be a part of left c in d if not jump\r\n                dTopY < cBotY && // may be a part of bot c in d if not couch\r\n                dBotY > cTopY // may be a part of top c in d if not jump\r\n            ) {\r\n                // stop the game (remove the newest request frame in queue)\r\n                cancelAnimationFrame(animationId);\r\n                // change game state\r\n                console.log('over');\r\n                gameState = GameState.OVER;\r\n                // update high score if need\r\n                scoreCounter.updateHighScore();\r\n                //cactuses = [];\r\n                //scoreCounter.setScore(0);\r\n            }\r\n        }\r\n        // push more cactus\r\n        cactusSpawnTime -= delta;\r\n        if (cactusSpawnTime < 0) {\r\n            if (Math.random() <= 0.7) {\r\n                enemies.push(new _classes_Cactus__WEBPACK_IMPORTED_MODULE_1__.Cactus(canvas.width + 10, canvas.height - ground.getHeight(), GAMESPEED));\r\n            }\r\n            else {\r\n                let h = canvas.height - ground.getHeight() - Math.random() * canvas.height / 2;\r\n                enemies.push(new _classes_Bird__WEBPACK_IMPORTED_MODULE_2__.Bird(canvas.width + 10, h, GAMESPEED));\r\n            }\r\n            cactusSpawnTime = genCacTime();\r\n        }\r\n        // change game speed slowly\r\n        bg.addMoreVelocity(0.05 / 20);\r\n        ground.addMoreVelocity(0.05);\r\n        enemies.forEach(i => {\r\n            i.addMoreVelocity(0.05);\r\n        });\r\n        GAMESPEED += 0.05;\r\n    }\r\n}\r\nfunction render() {\r\n    if (gameState === GameState.READY) {\r\n        // show start screen\r\n        startScene.draw(c);\r\n    }\r\n    else if (gameState === GameState.OVER) {\r\n        // show game over screen\r\n        gameOverScene.draw(c, scoreCounter.getScore(), scoreCounter.getHighScore());\r\n    }\r\n    else if (gameState === GameState.PLAYING) {\r\n        // clear screen\r\n        c.clearRect(0, 0, canvas.width, canvas.height);\r\n        // draw score\r\n        scoreCounter.draw(c);\r\n        // draw ground\r\n        ground.draw(c);\r\n        // draw bg\r\n        bg.draw(c);\r\n        // draw all objects\r\n        dino.draw(c);\r\n        for (let i = 0; i < enemies.length; i++) {\r\n            enemies[i].draw(c);\r\n        }\r\n    }\r\n}\r\nwindow.addEventListener('keydown', (event) => {\r\n    if (event.key === \" \" || event.key === 'w') {\r\n        btnPressed = _classes_Dino__WEBPACK_IMPORTED_MODULE_0__.BtnStatus.JUMP;\r\n    }\r\n    else if (event.key == 's') {\r\n        btnPressed = _classes_Dino__WEBPACK_IMPORTED_MODULE_0__.BtnStatus.COUCH;\r\n    }\r\n});\r\nwindow.addEventListener('keyup', (event) => {\r\n    if (event.key === \" \" || event.key === 'w') {\r\n        btnPressed = _classes_Dino__WEBPACK_IMPORTED_MODULE_0__.BtnStatus.NONE;\r\n    }\r\n    else if (event.key === 's') {\r\n        btnPressed = _classes_Dino__WEBPACK_IMPORTED_MODULE_0__.BtnStatus.NONE;\r\n    }\r\n});\r\ncanvas.addEventListener('click', (event) => {\r\n    let mousePos = getMousePosInCanvasCordinates(canvas, event);\r\n    if (gameState === GameState.OVER) {\r\n        if (gameOverScene.isInRestartBtn(mousePos.x, mousePos.y)) {\r\n            init(window.innerWidth, window.innerHeight, GameState.PLAYING);\r\n        }\r\n    }\r\n    else if (gameState === GameState.READY) {\r\n        if (startScene.isInPlayBtn(mousePos.x, mousePos.y)) {\r\n            init(window.innerWidth, window.innerHeight, GameState.PLAYING);\r\n        }\r\n    }\r\n});\r\nfunction init(width, height, state) {\r\n    // update canvas size\r\n    canvas.width = width - 100;\r\n    canvas.height = height - 100;\r\n    GAMESPEED = 200;\r\n    btnPressed = _classes_Dino__WEBPACK_IMPORTED_MODULE_0__.BtnStatus.NONE;\r\n    gameState = state;\r\n    if (gameState === GameState.READY) {\r\n        startScene = new _classes_StartScene__WEBPACK_IMPORTED_MODULE_6__.StartScene(canvas.width / 2, canvas.height / 2);\r\n    }\r\n    gameOverScene = new _classes_GameOverScene__WEBPACK_IMPORTED_MODULE_5__.GameOverScene(canvas.width / 2, canvas.height / 2);\r\n    ground = new _classes_Ground__WEBPACK_IMPORTED_MODULE_3__.Ground(0, canvas.height, GAMESPEED);\r\n    dino = new _classes_Dino__WEBPACK_IMPORTED_MODULE_0__.Dino(0 + 50, canvas.height - ground.getHeight() - 100);\r\n    enemies = [];\r\n    bg = new _classes_Background__WEBPACK_IMPORTED_MODULE_7__.BackGround(canvas.width, 100, GAMESPEED / 20);\r\n    scoreCounter.setScore(0);\r\n    lastTime = window.performance.now();\r\n    animationId = requestAnimationFrame(loop);\r\n    // something put here to init cactus position resize to screen\r\n}\r\nfunction genCacTime() {\r\n    return (Math.floor(Math.random() * 2) + 2 - GAMESPEED / 200) * 1000; // 1-4s\r\n}\r\nfunction getMousePosInCanvasCordinates(canvas, event) {\r\n    let rect = canvas.getBoundingClientRect();\r\n    return {\r\n        x: event.clientX - rect.left,\r\n        y: event.clientY - rect.top\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack://trexproject/./src/app.ts?");

/***/ }),

/***/ "./src/classes/Background.ts":
/*!***********************************!*\
  !*** ./src/classes/Background.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BackGround\": () => (/* binding */ BackGround)\n/* harmony export */ });\nclass CloudImage {\r\n    constructor(image, xBotLeft, yBotLeft, width, height) {\r\n        this.image = image;\r\n        this.xBotLeft = xBotLeft;\r\n        this.yBotLeft = yBotLeft;\r\n        this.width = width;\r\n        this.height = height;\r\n    }\r\n}\r\nclass BackGround {\r\n    constructor(xBottomLeft, yBottomLeft, xVelocity) {\r\n        this.xBottomLeft = xBottomLeft;\r\n        this.yBottomLeft = yBottomLeft;\r\n        this.xVelocity = xVelocity;\r\n        this.path = './images/cloud/';\r\n        this.timeToAddMoreCloud = Math.random() * 5000;\r\n        this.images = [];\r\n        this.images.push(new CloudImage(new Image(), this.xBottomLeft, this.yBottomLeft + Math.random() * 100, 0, 0));\r\n        this.images[0].image.src = this.path + 'cloud.png';\r\n        this.images[0].image.onload = () => {\r\n            let scale = Math.random() * 2;\r\n            this.images[0].width = this.images[0].image.width * scale;\r\n            this.images[0].height = this.images[0].image.height * scale;\r\n        };\r\n    }\r\n    addMoreVelocity(amount) {\r\n        this.xVelocity += amount;\r\n    }\r\n    update(delta) {\r\n        for (let i = 0; i < this.images.length; i++) {\r\n            // delete ground if out of screen\r\n            if (this.images[i].xBotLeft + this.images[i].width < 0) {\r\n                this.images.splice(i, 1);\r\n                i--;\r\n                continue;\r\n            }\r\n            // change position\r\n            this.images[i].xBotLeft = this.images[i].xBotLeft - this.xVelocity * delta / 1000;\r\n        }\r\n        // add more cloud\r\n        this.timeToAddMoreCloud -= delta;\r\n        if (this.timeToAddMoreCloud < 0) {\r\n            this.images.push(new CloudImage(new Image(), this.xBottomLeft, this.yBottomLeft + Math.random() * 100, 0, 0));\r\n            this.images[this.images.length - 1].image.src = this.path + 'cloud.png';\r\n            this.images[this.images.length - 1].image.onload = () => {\r\n                let scale = Math.random() * 2;\r\n                this.images[this.images.length - 1].width = this.images[this.images.length - 1].image.width * scale;\r\n                this.images[this.images.length - 1].height = this.images[this.images.length - 1].image.height * scale;\r\n            };\r\n            this.timeToAddMoreCloud = Math.random() * 5000;\r\n        }\r\n    }\r\n    draw(context) {\r\n        // context.beginPath();\r\n        // canvas.rect(0, this.yBottomRight - 50, this.xBottomRight, this.yBottomRight);\r\n        // canvas.fillStyle = 'yellow';\r\n        // canvas.fill();\r\n        for (let i = 0; i < this.images.length; i++) {\r\n            context.beginPath();\r\n            context.drawImage(this.images[i].image, this.images[i].xBotLeft, this.images[i].yBotLeft - this.images[i].height, this.images[i].width, this.images[i].height);\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://trexproject/./src/classes/Background.ts?");

/***/ }),

/***/ "./src/classes/Bird.ts":
/*!*****************************!*\
  !*** ./src/classes/Bird.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Bird\": () => (/* binding */ Bird)\n/* harmony export */ });\nclass Bird {\r\n    constructor(xBottom, yBottom, xVelocity) {\r\n        this.xBottom = xBottom;\r\n        this.yBottom = yBottom;\r\n        this.xVelocity = xVelocity;\r\n        // for animation\r\n        this.path = './images/bird/';\r\n        this.sumDelta = 0;\r\n        this.curFrame = 0;\r\n        this.noOfFrames = 2;\r\n        this.image = new Image();\r\n        // generate a random cactus range 0-9\r\n        this.image.src = this.path + 'fly0.png';\r\n        this.width = 0;\r\n        this.height = 0;\r\n        this.image.onload = () => {\r\n            this.width = this.image.width;\r\n            this.height = this.image.height;\r\n        };\r\n    }\r\n    addMoreVelocity(amount) {\r\n        this.xVelocity += amount;\r\n    }\r\n    update(delta) {\r\n        // change position\r\n        this.xBottom = this.xBottom - this.xVelocity * delta / 1000;\r\n        // animation\r\n        this.sumDelta += delta;\r\n        if (this.sumDelta / 1000 > 0.1125) {\r\n            this.sumDelta = 0;\r\n            this.changeAnimation();\r\n        }\r\n    }\r\n    changeAnimation() {\r\n        this.curFrame = (this.curFrame + 1) % this.noOfFrames;\r\n        this.image.src = this.path + 'fly' + this.curFrame.toString() + '.png';\r\n        // update width and height\r\n        this.image.onload = () => {\r\n            this.width = this.image.width;\r\n            this.height = this.image.height;\r\n        };\r\n    }\r\n    getPosition() {\r\n        return [this.xBottom, this.yBottom];\r\n    }\r\n    getBotLeftPosition() {\r\n        return [this.xBottom - this.width / 2, this.yBottom];\r\n    }\r\n    getBotRightPosition() {\r\n        return [this.xBottom + this.width / 2, this.yBottom];\r\n    }\r\n    getTopLeftPosition() {\r\n        return [this.xBottom - this.width / 2, this.yBottom - this.height];\r\n    }\r\n    getTopRightPosition() {\r\n        return [this.xBottom + this.width / 2, this.yBottom - this.height];\r\n    }\r\n    draw(context) {\r\n        context.beginPath();\r\n        // context.rect(this.xBottom - this.width / 2, this.yBottom - this.height, 20, 20);\r\n        // context.fillStyle = 'blue';\r\n        // context.fill();\r\n        context.drawImage(this.image, this.xBottom - this.width / 2, this.yBottom - this.height);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://trexproject/./src/classes/Bird.ts?");

/***/ }),

/***/ "./src/classes/Cactus.ts":
/*!*******************************!*\
  !*** ./src/classes/Cactus.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Cactus\": () => (/* binding */ Cactus)\n/* harmony export */ });\nclass Cactus {\r\n    constructor(xBottom, yBottom, xVelocity) {\r\n        this.xBottom = xBottom;\r\n        this.yBottom = yBottom;\r\n        this.xVelocity = xVelocity;\r\n        // for animation\r\n        this.path = './images/cactus/';\r\n        this.image = new Image();\r\n        // generate a random cactus range 0-9\r\n        this.image.src = this.path + 'cactus' + Math.floor(Math.random() * 10) + '.png';\r\n        this.width = 0;\r\n        this.height = 0;\r\n        this.image.onload = () => {\r\n            this.width = this.image.width;\r\n            this.height = this.image.height;\r\n        };\r\n    }\r\n    addMoreVelocity(amount) {\r\n        this.xVelocity += amount;\r\n    }\r\n    update(delta) {\r\n        this.xBottom = this.xBottom - this.xVelocity * delta / 1000;\r\n    }\r\n    getPosition() {\r\n        return [this.xBottom, this.yBottom];\r\n    }\r\n    getBotLeftPosition() {\r\n        return [this.xBottom - this.width / 2, this.yBottom];\r\n    }\r\n    getBotRightPosition() {\r\n        return [this.xBottom + this.width / 2, this.yBottom];\r\n    }\r\n    getTopLeftPosition() {\r\n        return [this.xBottom - this.width / 2, this.yBottom - this.height];\r\n    }\r\n    getTopRightPosition() {\r\n        return [this.xBottom + this.width / 2, this.yBottom - this.height];\r\n    }\r\n    draw(context) {\r\n        context.beginPath();\r\n        // context.rect(this.xBottom - this.width / 2, this.yBottom - this.height, 20, 20);\r\n        // context.fillStyle = 'blue';\r\n        // context.fill();\r\n        context.drawImage(this.image, this.xBottom - this.width / 2, this.yBottom - this.height);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://trexproject/./src/classes/Cactus.ts?");

/***/ }),

/***/ "./src/classes/Dino.ts":
/*!*****************************!*\
  !*** ./src/classes/Dino.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BtnStatus\": () => (/* binding */ BtnStatus),\n/* harmony export */   \"Dino\": () => (/* binding */ Dino)\n/* harmony export */ });\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app */ \"./src/app.ts\");\n\r\nvar DinoStatus;\r\n(function (DinoStatus) {\r\n    DinoStatus[DinoStatus[\"GROUNDED\"] = 0] = \"GROUNDED\";\r\n    DinoStatus[DinoStatus[\"AIR\"] = 1] = \"AIR\";\r\n    DinoStatus[DinoStatus[\"COUCH\"] = 2] = \"COUCH\";\r\n})(DinoStatus || (DinoStatus = {}));\r\n;\r\nvar BtnStatus;\r\n(function (BtnStatus) {\r\n    BtnStatus[BtnStatus[\"JUMP\"] = 0] = \"JUMP\";\r\n    BtnStatus[BtnStatus[\"COUCH\"] = 1] = \"COUCH\";\r\n    BtnStatus[BtnStatus[\"NONE\"] = 2] = \"NONE\";\r\n})(BtnStatus || (BtnStatus = {}));\r\n;\r\nclass Dino {\r\n    constructor(xBottom, // ground cordinates\r\n    yBottom) {\r\n        this.xBottom = xBottom;\r\n        this.yBottom = yBottom;\r\n        this.velocityY = 0; // velocity\r\n        this.jumpAddVelocityY = 500; // px/s // if jump, add this velocity to velocityY\r\n        this.couchAddVelocityY = 100; // px/s // if on air, go down faster\r\n        this.curBtnPress = BtnStatus.NONE;\r\n        this.state = DinoStatus.GROUNDED;\r\n        // for animation\r\n        this.path = './images/dino/';\r\n        this.noOfRunFrames = 2;\r\n        this.noOfCouchFrames = 2;\r\n        this.curRunFrames = 0;\r\n        this.curCouchFrames = 0;\r\n        this.sumDelta = 0;\r\n        this.image = new Image();\r\n        this.image.src = this.path + 'idle.png';\r\n        this.width = 0;\r\n        this.height = 0;\r\n        this.image.onload = () => {\r\n            this.width = this.image.width;\r\n            this.height = this.image.height;\r\n        };\r\n    }\r\n    getPosition() {\r\n        return [this.xBottom, this.yBottom];\r\n    }\r\n    getBotLeftPosition() {\r\n        return [this.xBottom - this.width / 2, this.yBottom];\r\n    }\r\n    getBotRightPosition() {\r\n        return [this.xBottom + this.width / 2, this.yBottom];\r\n    }\r\n    getTopLeftPosition() {\r\n        return [this.xBottom - this.width / 2, this.yBottom - this.height];\r\n    }\r\n    getTopRightPosition() {\r\n        return [this.xBottom + this.width / 2, this.yBottom - this.height];\r\n    }\r\n    setPosition(x, y) {\r\n        this.xBottom = x;\r\n        this.yBottom = y;\r\n    }\r\n    setBtnPressed(val) {\r\n        this.curBtnPress = val;\r\n    }\r\n    update(delta, ground) {\r\n        // check for jump\r\n        if (this.curBtnPress === BtnStatus.JUMP && this.state === DinoStatus.GROUNDED) {\r\n            // add more v\r\n            this.velocityY -= this.jumpAddVelocityY;\r\n            // change state\r\n            this.curBtnPress = BtnStatus.NONE;\r\n            this.state = DinoStatus.AIR;\r\n        }\r\n        else if (this.curBtnPress === BtnStatus.COUCH) { // check for couch\r\n            // minus v if on air\r\n            if (DinoStatus.AIR) {\r\n                this.velocityY += this.couchAddVelocityY;\r\n            }\r\n            // change state\r\n            this.curBtnPress = BtnStatus.COUCH;\r\n            this.state = DinoStatus.COUCH;\r\n        }\r\n        else if (this.curBtnPress === BtnStatus.NONE) {\r\n            this.state = DinoStatus.AIR; // will change to ground below\r\n        }\r\n        // change the cordinate\r\n        this.yBottom += this.velocityY * delta / 1000;\r\n        // check for gravity\r\n        let groundCorY = ground.getYBotLeftPosition() - ground.getHeight();\r\n        // - if on air\r\n        if (this.yBottom < groundCorY) { // check on ground\r\n            this.velocityY += _app__WEBPACK_IMPORTED_MODULE_0__.GRAVITY * delta / 1000;\r\n            this.state = DinoStatus.AIR;\r\n        }\r\n        else {\r\n            this.velocityY = 0;\r\n            if (this.state != DinoStatus.COUCH)\r\n                this.state = DinoStatus.GROUNDED;\r\n            this.yBottom = groundCorY;\r\n        }\r\n        // for animation\r\n        this.sumDelta += delta;\r\n        if (this.sumDelta / 1000 > 0.1125) { // change frames every 0.1125 seconds\r\n            this.sumDelta = 0;\r\n            this.changeAnimation();\r\n        }\r\n    }\r\n    changeAnimation() {\r\n        if (this.state === DinoStatus.GROUNDED) {\r\n            this.curRunFrames = (this.curRunFrames + 1) % this.noOfRunFrames;\r\n            this.image.src = this.path + 'run' + this.curRunFrames.toString() + '.png';\r\n        }\r\n        else if (this.state === DinoStatus.AIR) {\r\n            this.image.src = this.path + 'idle.png';\r\n        }\r\n        else if (this.state === DinoStatus.COUCH) {\r\n            this.curCouchFrames = (this.curCouchFrames + 1) % this.noOfCouchFrames;\r\n            this.image.src = this.path + 'couch' + this.curCouchFrames + '.png';\r\n        }\r\n        // update width and height\r\n        this.image.onload = () => {\r\n            this.width = this.image.width;\r\n            this.height = this.image.height;\r\n        };\r\n    }\r\n    draw(context) {\r\n        context.beginPath();\r\n        // context.rect(this.xBottom - this.width / 2, this.yBottom - this.height, this.width, this.height);\r\n        context.drawImage(this.image, this.xBottom - this.width / 2, this.yBottom - this.height);\r\n        // context.fill();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://trexproject/./src/classes/Dino.ts?");

/***/ }),

/***/ "./src/classes/GameOverScene.ts":
/*!**************************************!*\
  !*** ./src/classes/GameOverScene.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GameOverScene\": () => (/* binding */ GameOverScene)\n/* harmony export */ });\nclass GameOverScene {\r\n    constructor(xCenter, yCenter) {\r\n        this.xCenter = xCenter;\r\n        this.yCenter = yCenter;\r\n        this.restartBtnImage = new Image();\r\n        this.restartBtnImage.src = \"./images/restartButton.png\"; // need time to load in the background\r\n        this.boxWidth = 400;\r\n        this.boxHeight = 200;\r\n        this.restartBtnWidth = this.restartBtnImage.width;\r\n        this.restartBtnHeight = this.restartBtnImage.height;\r\n    }\r\n    getRestartBtnPos() {\r\n        return {\r\n            xTopLeft: this.xCenter - this.boxWidth / 2,\r\n            yTopLeft: this.yCenter - this.boxHeight / 2,\r\n            width: this.restartBtnWidth,\r\n            height: this.restartBtnHeight\r\n        };\r\n    }\r\n    isInRestartBtn(x, y) {\r\n        if (x > this.xCenter - this.boxWidth / 2 &&\r\n            x < this.xCenter - this.boxWidth / 2 + this.restartBtnWidth &&\r\n            y > this.yCenter - this.boxHeight / 2 &&\r\n            y < this.yCenter - this.boxHeight / 2 + this.restartBtnHeight)\r\n            return true;\r\n        return false;\r\n    }\r\n    draw(context, score, highScore) {\r\n        context.beginPath();\r\n        // context.arc(this.xBottom, this.yBottom - 20, 20, 0, Math.PI * 2, true);\r\n        context.rect(this.xCenter - this.boxWidth / 2, this.yCenter - this.boxHeight / 2, this.boxWidth, this.boxHeight);\r\n        context.fillStyle = 'grey';\r\n        context.fill();\r\n        context.beginPath();\r\n        context.drawImage(this.restartBtnImage, this.xCenter - this.boxWidth / 2, this.yCenter - this.boxHeight / 2);\r\n        // score\r\n        context.beginPath();\r\n        context.font = \"50px sans-serif\";\r\n        context.fillStyle = \"white\";\r\n        context.textAlign = \"center\";\r\n        context.fillText('Score: ' + score.toString(), this.xCenter, this.yCenter);\r\n        context.closePath();\r\n        //highscore\r\n        context.beginPath();\r\n        context.font = \"20px sans-serif\";\r\n        context.fillStyle = \"white\";\r\n        context.textAlign = \"center\";\r\n        context.fillText('High Score: ' + highScore.toString(), this.xCenter, this.yCenter + this.boxHeight / 3);\r\n        context.closePath();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://trexproject/./src/classes/GameOverScene.ts?");

/***/ }),

/***/ "./src/classes/Ground.ts":
/*!*******************************!*\
  !*** ./src/classes/Ground.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Ground\": () => (/* binding */ Ground)\n/* harmony export */ });\nclass GroundImage {\r\n    constructor(image, xBotLeft) {\r\n        this.image = image;\r\n        this.xBotLeft = xBotLeft;\r\n    }\r\n}\r\nclass Ground {\r\n    constructor(xBottomLeft, yBottomLeft, xVelocity) {\r\n        this.xBottomLeft = xBottomLeft;\r\n        this.yBottomLeft = yBottomLeft;\r\n        this.xVelocity = xVelocity;\r\n        this.path = './images/ground/';\r\n        this.images = [];\r\n        this.images.push(new GroundImage(new Image(), this.xBottomLeft));\r\n        this.images[0].image.src = this.path + 'ground.png';\r\n        this.width = 0;\r\n        this.height = 0;\r\n        this.images[0].image.onload = () => {\r\n            this.width = this.images[0].image.width;\r\n            this.height = this.images[0].image.height;\r\n        };\r\n    }\r\n    getYBotLeftPosition() {\r\n        return this.yBottomLeft;\r\n    }\r\n    getHeight() {\r\n        return this.height;\r\n    }\r\n    addMoreVelocity(amount) {\r\n        this.xVelocity += amount;\r\n    }\r\n    update(delta, canvas) {\r\n        for (let i = 0; i < this.images.length; i++) {\r\n            // delete ground if out of screen\r\n            if (this.images[i].xBotLeft + this.width < 0) {\r\n                this.images.splice(i, 1);\r\n                i--;\r\n                continue;\r\n            }\r\n            // change position\r\n            this.images[i].xBotLeft = this.images[i].xBotLeft - this.xVelocity * delta / 1000;\r\n            // add more ground if need\r\n            if (i === this.images.length - 1 &&\r\n                this.images[i].xBotLeft + this.width <= canvas.width) {\r\n                this.images.push(new GroundImage(new Image(), this.images[i].xBotLeft + this.width));\r\n                this.images[i + 1].image.src = this.path + 'ground.png';\r\n                break;\r\n            }\r\n        }\r\n    }\r\n    draw(context) {\r\n        // context.beginPath();\r\n        // canvas.rect(0, this.yBottomRight - 50, this.xBottomRight, this.yBottomRight);\r\n        // canvas.fillStyle = 'yellow';\r\n        // canvas.fill();\r\n        for (let i = 0; i < this.images.length; i++) {\r\n            context.beginPath();\r\n            context.drawImage(this.images[i].image, this.images[i].xBotLeft, this.yBottomLeft - this.height * 2);\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://trexproject/./src/classes/Ground.ts?");

/***/ }),

/***/ "./src/classes/ScoreCounter.ts":
/*!*************************************!*\
  !*** ./src/classes/ScoreCounter.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ScoreCounter\": () => (/* binding */ ScoreCounter)\n/* harmony export */ });\nclass ScoreCounter {\r\n    constructor(xBotLeft, yBotLeft, textSize) {\r\n        this.xBotLeft = xBotLeft;\r\n        this.yBotLeft = yBotLeft;\r\n        this.textSize = textSize;\r\n        this.score = 0;\r\n        this.highscore = 0;\r\n    }\r\n    setScore(val) {\r\n        this.score = val;\r\n    }\r\n    getScore() {\r\n        return this.score;\r\n    }\r\n    getHighScore() {\r\n        return this.highscore;\r\n    }\r\n    updateHighScore() {\r\n        if (this.highscore < this.score)\r\n            this.highscore = this.score;\r\n    }\r\n    draw(context) {\r\n        context.beginPath();\r\n        context.font = this.textSize + \"px sans-serif\";\r\n        context.fillStyle = \"blue\";\r\n        context.textAlign = \"left\";\r\n        context.fillText('Score: ' + this.score.toString(), this.xBotLeft, this.yBotLeft);\r\n        context.closePath();\r\n        context.beginPath();\r\n        context.textAlign = \"right\";\r\n        context.fillText('HighScore: ' + this.highscore.toString(), this.xBotLeft + 300, this.yBotLeft);\r\n        context.closePath();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://trexproject/./src/classes/ScoreCounter.ts?");

/***/ }),

/***/ "./src/classes/StartScene.ts":
/*!***********************************!*\
  !*** ./src/classes/StartScene.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"StartScene\": () => (/* binding */ StartScene)\n/* harmony export */ });\nclass StartScene {\r\n    constructor(xCenter, yCenter) {\r\n        this.xCenter = xCenter;\r\n        this.yCenter = yCenter;\r\n        this.playBtnImage = new Image();\r\n        this.playBtnImage.src = \"./images/playButton.png\"; // need time to load in the background\r\n        this.boxWidth = 400;\r\n        this.boxHeight = 200;\r\n        this.playBtnWidth = 200;\r\n        this.playBtnHeight = 140;\r\n    }\r\n    isInPlayBtn(x, y) {\r\n        if (x > this.xCenter - this.playBtnWidth / 2 &&\r\n            x < this.xCenter + this.playBtnWidth / 2 &&\r\n            y > this.yCenter - this.playBtnHeight / 2 &&\r\n            y < this.yCenter + this.playBtnHeight / 2)\r\n            return true;\r\n        return false;\r\n    }\r\n    draw(context) {\r\n        context.beginPath();\r\n        // context.arc(this.xBottom, this.yBottom - 20, 20, 0, Math.PI * 2, true);\r\n        context.rect(this.xCenter - this.boxWidth / 2, this.yCenter - this.boxHeight / 2, this.boxWidth, this.boxHeight);\r\n        context.fillStyle = 'grey';\r\n        context.fill();\r\n        context.beginPath();\r\n        context.drawImage(this.playBtnImage, this.xCenter - this.playBtnWidth / 2, this.yCenter - this.playBtnHeight / 2, this.playBtnWidth, this.playBtnHeight);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://trexproject/./src/classes/StartScene.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;