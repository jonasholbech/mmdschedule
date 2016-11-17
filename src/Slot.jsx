import React, { Component } from 'react';

class Slot extends Component {
    constructor(props){
        super(props);
        this.slotClicked = this.slotClicked.bind(this);
        this.state = {
            text:this.props.text
        }
    }
    slotClicked(e){
        //console.log(this);
        var f = document.querySelector("#editor");
        f.querySelector('textarea').value=this.state.text;
        f.classList.add("visible");
        var that=this;
        f.querySelector('button').addEventListener('click', function x(e){
            e.preventDefault();
            that.setState(
                {
                    text:f.querySelector('textarea').value
                }
            );

            f.classList.remove('visible');
            f.querySelector('button').removeEventListener('click', x);
        });
        /*
        this.setState({
            text:<textarea>{this.state.text}</textarea>
        });*/
    }
    render() {
        return (
            <td className="Slot" onDoubleClick={this.slotClicked} ref={(td) => this.cell = td}>
                {this.state.text}
            </td>
        );
    }
}

export default Slot;
