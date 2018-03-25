class Stopwatch extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
    }

    reset() {
		this.setState({
			times: {
				minutes : 0,
				seconds : 0,
				miliseconds : 0
			}
        });
    }

    
    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.state.running) {
            this.state.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
    }

    calculate() {
        this.state.times.miliseconds += 1;
        if (this.state.times.miliseconds >= 100) {
            this.state.times.seconds += 1;
            this.state.times.miliseconds = 0;
        }

        if (this.state.times.seconds >= 60) {
            this.state.times.minutes += 1;
            this.state.times.seconds = 0;
        }
    }

    stop() {
        this.setState({
            running: false
        });
        clearInterval(this.watch);
    }

    reset() {
        this.setState({
            time: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        });
    }

    save() {
        this.setState({
            results: [...this.state.results, this.state.times]
       });
    }
   
    clear(){
        this.setState({
            results:[]
        });
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
};


ReactDOM.render(<Stopwatch />, document.getElementById('stopwatch'));
