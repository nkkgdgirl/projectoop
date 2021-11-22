import React,{Component} from 'react';
import axios from 'axios';
import {Bar , Line , Scatter ,Doughnut ,Pie } from 'react-chartjs-2';

export default class Test1 extends Component{

    constructor(props)
    {
        super(props)
        this.state = {
            dataall : {
                    labels : [],
                    datasets: [{
                      label: '',
                      data: [],
                    }]          
            }
        }
    }
    componentDidMount() {
        axios.get("http://localhost:8000/csv.csv")
        .then( (res) => {
            this.setData(res.data)
        })

        .catch(function (error) {
            console.log(error);
        })   
    }

    setData(data)
    {
        console.log('123');
        console.log(data);
        
        var arr = [];
        for(var i = 0 ; i < data.length; i++)
        {
            arr.push(data[i].point.substring(0,2))
        }
        arr.sort();
        console.log(arr)

        var newarr = [];
        var currt = null;
        var cnt = 0;

        for (var i = 0 ; i <= arr.length; i++ ){
            if (arr[i] != currt ){
                if ( cnt > 0 )
                {
                    newarr.push(cnt);
                    // console.log( currt +" "+ currt)
                }
                currt = arr[i];
                cnt = 1;
            }
            else {
                cnt++
            }
        }
        if (cnt > 0) {
            console.log(currt + ' comes --> ' + currt + ' times');
        }
    
        console.log(newarr)

        const test = (value, index, self) => {
            return self.indexOf(value) === index;
          }
          
          // usage example:
          var arr2;
          var  arr2 = arr.filter(test);

          console.log(arr2)
        
        this.setState({
            dataall : {
                labels : arr2,
                datasets: [{
                  label: '',
                  data: newarr,
                }]          
        }
        })
    }

    render() {
        const { dataall } = this.state;
        return( 
            <div style={ { paddingLeft :'470px' ,width: '500px'}}>     
                <Bar data = {dataall}/>    
                <Line data = {dataall} />   
                <Scatter data = {dataall} />   
                <Doughnut data = {dataall} />
                <Pie  data = {dataall} />
            </div>
        )
    }
}