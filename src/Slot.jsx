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
        f.querySelector('textarea').value=this.state.text.replace(/<br \/>/g,'');
        f.classList.add("visible");
        e.preventDefault();
        f.querySelector('textarea').focus();
        var that=this;
        f.querySelector('button').addEventListener('click', function x(e){
            e.preventDefault();
            that.setState(
                {
                    text:f.querySelector('textarea').value.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br />' + '$2')
                }
            );

            f.classList.remove('visible');
            f.querySelector('button').removeEventListener('click', x);
        });
    }
    componentWillReceiveProps(newProps){
        this.setState({
            text:newProps.text
        });
    }
    render() {
        return (
            <div className="Slot" onDoubleClick={this.slotClicked} dangerouslySetInnerHTML={{__html: this.state.text}}></div>
        );
    }
}

export default Slot;
