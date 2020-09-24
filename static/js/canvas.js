let startPoint;
let moveEvent = new Event("move", { data: [] });
let timer;

class Painter {

    /**
     * 
     * @param {string} selector id选择器
     * @param {Array} treatedData 二维坐标数组
     */
    constructor(selector, treatedData) {
        this._canvas = document.getElementById(selector);
        this._context = this._canvas.getContext("2d");
        this._treatedData = treatedData;
        this._computedData = [];
        this._i = 0;
        this.init();
    }

    getCanvas() {
        return this._canvas;
    }

    restart() {
        this._i = 0;
        this.stop().start();
        return this;
    }

    stop() {
        clearTimeout(timer);
        return this;
    }

    start() {
        if (this._i < this._computedData.length) {
            this.clear().drawRoad().drawVehicle();
            timer = setTimeout(() => this.start(), 100);
            this._i++;
        }

        return this;
    }

    drawVehicle() {
        moveEvent.data = this._computedData[this._i];
        this._canvas.dispatchEvent(moveEvent);

        this._context.save();
        this._context.beginPath();
        this._context.arc(this._computedData[this._i][0], this._computedData[this._i][1], 10, 0, Math.PI * 2)
        this._context.fillStyle = "tomato";
        this._context.fill();
        this._context.restore();

        return this;
    }

    drawRoad() {
        this._context.beginPath();
        this._context.lineWidth = 2;
        this._context.strokeStyle = "lightseagreen";
        this._context.moveTo(this._computedData[0][0], this._computedData[0][1]);

        for (let i = 1; i < this._computedData.length; i++) {
            this._context.lineTo(this._computedData[i][0], this._computedData[i][1]);
        }
        this._context.stroke();

        return this;
    }

    clear() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        return this;
    }

    init() {
        this._canvas.width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
        this._canvas.height = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
        // this._canvas.style.visibility = "visible";
        // this._canvas.style.zIndex = "1";

        if (this._canvas.width < 992) {
            startPoint = { x: (this._canvas.width - 375) / 2, y: 0 };
        } else {
            startPoint = { x: this._canvas.width / 3, y: -this._canvas.height / 10 };
        }

        this._computedData = this._treatedData.map((value) => {
            return [value[0] + startPoint.x, value[1] + startPoint.y];
        });

        return this;
    }
}


// 线性插值
function lerp(a, b, fraction) {
    let tempArr = [[a[0], a[1]]];
    for (let i = 1; i < fraction; i++) {
        tempArr.push([(b[0] - a[0]) * i / fraction + a[0], (b[1] - a[1]) * i / fraction + a[1]]);
    }
    return tempArr.reverse();
}
