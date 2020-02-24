import React, { Component } from 'react';
import Cell from './Cell';

export default class Board extends Component {
    renderCell(i){
        return <Cell value={this.props.cells[i]} 
        onClick={()=>this.props.onClick(i)} />
    }

    render() {
        return (
            <React.Fragment>
                <div className="grid-row row-1"></div>
                <div className="grid-row row-2"></div>
                <div className="grid-column column-1"></div>
                <div className="grid-column column-2"></div>
                <div className="cells-row">
                    {this.renderCell(0)}
                    {this.renderCell(1)}
                    {this.renderCell(2)}
                </div>
                <div className="cells-row">
                    {this.renderCell(3)}
                    {this.renderCell(4)}
                    {this.renderCell(5)}
                </div>
                <div className="cells-row">
                    {this.renderCell(6)}
                    {this.renderCell(7)}
                    {this.renderCell(8)}
                </div>
            </React.Fragment>
        )
    }
}








