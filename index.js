class Timer extends HTMLElement {

    constructor() {
        super()
        this.main = this.attachShadow({mode:'open'})
        this.loadStyle()
        this.buildTimer()
    }

    loadStyle() {
        let style = document.createElement('style')
        style.innerHTML = `
            .app {
                max-width: 300px;
                width: 100%;
                margin: 80px auto;
                background: aliceblue;
                border-radius: 20px;
                padding: 20px;
            }
            .item {
                font-size:70px;
                letter-spacing:35px;
                color:#f9940d;
                text-align:center;
                transition:5s;
            }
            .footer {
                display:flex;
                flex-wrap:nowrap;
                justify-content:space-between;
            }
            .btn {
                font-size:25px;
                border:none;
                padding:15px;
                background:#f9940d;
                color:#ffffff;
                cursor:pointer;
                border-radius:20px;
            }
        `
        this.main.append(style)
    }

    buildTimer() {
        let app = document.createElement('div')
        app.className = 'app'
        let div  = document.createElement('div')
        div.className = 'item'
        div.innerText = "00:00"

        let footer = document.createElement('div')
        footer.className = 'footer'

        // Start button
        let startBtn = document.createElement('button')
        startBtn.innerText = 'Start'
        startBtn.className = 'btn'
        let [sec,min] = [0,0]
        let timer 
        startBtn.onclick = () => {
            timer  = setInterval(() => {
                if(sec == 60) {
                    min++
                    sec = 0
                }
                sec++
                div.innerText = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0"+sec : sec )
            }, 1000);
        }

        // Stop button
        let stopBtn = document.createElement('button')
        stopBtn.innerText = 'Stop'
        stopBtn.className = 'btn'

        stopBtn.onclick = () => {
            clearInterval(timer)
        }

         // clear timer

         let clearBtn = document.createElement('button')
         clearBtn.className = 'btn'
         clearBtn.innerText = 'clear'
         clearBtn.onclick = () => {
            clearInterval(timer)
            min = 0
            sec = 0
            div.innerText = "00:00"
         }

        footer.append(startBtn,clearBtn,stopBtn)

        app.append(div,footer)
        this.main.append(app)
    }

}

customElements.define('app-timer',Timer)