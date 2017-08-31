import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { NavBar, Icon ,DatePicker, List } from 'antd-mobile';


import { createForm } from 'rc-form';
import moment from 'moment';
import 'moment/locale/zh-cn';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';

const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2016-12 +0800', 'YYYY-MM Z').utcOffset(8);
const minDate = moment('2015-08 +0800', 'YYYY-MM Z').utcOffset(8);

const maxTime = moment('22:00 +0800', 'HH:mm Z').utcOffset(8);
const minTime = moment('08:30 +0800', 'HH:mm Z').utcOffset(8);

const gmtNow = moment().utcOffset(0);



import createReactClass from 'create-react-class';
// 如果不是使用 List.Item 作为 children
const CustomChildren = props => (
  <div
    onClick={props.onClick}
    style={{ backgroundColor: '#fff', height: '0.9rem', lineHeight: '0.9rem', padding: '0 0.3rem' }}
  >
    {props.children}
    <span style={{ float: 'right', color: '#888' }}>{props.extra}</span>
  </div>
);




var IndexPage = createReactClass({


  getInitialState: function () {
    return {
      date: zhNow,
      dpValue: null,
      visible: false,
    }
  },

  onChange:function(date){
    // console.log('onChange', date);
    this.setState({
      date,
    });
  },



  render: function() {

    const { getFieldProps } = this.props.form;

    return (
      <div>
        <NavBar leftContent="back"
                mode="light"
                onLeftClick={() => console.log('onLeftClick')}
                rightContent={[
                  <Icon key="0" type="search" style={{ marginRight: '0.32rem' }} />,
                  <Icon key="1" type="ellipsis" />,
                ]}
        >bbbbb</NavBar>
        <Icon type={require('../assets/icon-core/adduser.svg')} />

        <List
          className="date-picker-list"
          style={{ backgroundColor: 'white' }}
        >

          <DatePicker
            mode="month"
            title="选择日期"
            format={val => val.format('YYYY-MM ')}
            extra="可选,小于结束日期"
            {...getFieldProps('date1', {

            })}
            minDate={minDate}
            maxDate={maxDate}
            cols={2}
          >
            <CustomChildren>时间选择(自定义 children)</CustomChildren>
          </DatePicker>


        </List>


      </div>
    );
  }

});


IndexPage  = createForm()(IndexPage );


export default IndexPage;
