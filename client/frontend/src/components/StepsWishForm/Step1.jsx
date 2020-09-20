import React, { Component } from 'react';
import {
    Form,
    Card,
    notification,
    Icon,
    Button,

} from 'antd';


class Step extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRedirect: false,
            iconLoading: false,
            dashboard: '',
        };
    }

    componentDidMount = async () => {

    }

    handleSubmit = async event => {
        event.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {

            }
        });
    };


    render() {
        const someVariable = '';

        return (
            <div>
                <div className="dashBoardContainer">
                    <div className="dashBoardContentDrag borderDesign">
                        <Card
                            size="small"
                            bordered={false}
                            className="userCardSlider"
                        >
                            <div className='newForm'>Новая Заявка &nbsp;
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M14 5.00004L9.63529 9.73219C9.30588 10.0893 8.79118 10.0893 8.46176 9.73219C8.13235 9.37504 8.13235 8.81701 8.46176 8.45987L11.6735 5.00004L8.46176 1.5179C8.13235 1.16076 8.13235 0.602722 8.46176 0.245579C8.79118 -0.111564 9.30588 -0.111564 9.63529 0.245579L14 5.00004Z"
                                        fill="#282828"
                                    />
                                    <path
                                        d="M-0.000100175 5.00003C-0.000100153 4.50896 0.370488 4.10718 0.82343 4.10718L12.7646 4.10718C13.2175 4.10718 13.5881 4.50896 13.5881 5.00003C13.5881 5.49111 13.2175 5.89289 12.7646 5.89289L0.82343 5.89289C0.370488 5.89289 -0.000100196 5.49111 -0.000100175 5.00003Z"
                                        fill="#282828"
                                    />
                                </svg>
                                <span className='newForm2'>
                                    &nbsp;&nbsp;&nbsp; 1. Приоритет заявки</span> &nbsp;&nbsp;&nbsp;
                      <span className='newForm3'>Переместите бокс по приоритету</span>
                            </div>
                            <div style={{ textAlign: 'left', height: '300px' }}>
                                {/* <ItemList />
                                         */}
                  Здесь можно указать основную информацию о правилах заведения новой заявки для новых пользователей
                  </div>
                            <Button
                                type="primary"
                                className='bidding-btn-step--skip'
                                onClick={this.step}
                            >
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.9996 3.99972L8.25842 0.214007C7.97607 -0.0717068 7.53489 -0.0717068 7.25254 0.214007C6.97018 0.499722 6.97018 0.946149 7.25254 1.23186L10.0055 4.01758L7.25254 6.78544C6.97018 7.07115 6.97018 7.51758 7.25254 7.80329C7.53489 8.08901 7.97607 8.08901 8.25842 7.80329L11.9996 3.99972Z" fill="black" />
                                    <path d="M3.68824 3.28578H0.705882C0.317647 3.28578 0 3.60721 0 4.00007C0 4.39293 0.317647 4.71436 0.705882 4.71436H3.68824C4.07647 4.71436 4.39412 4.39293 4.39412 4.00007C4.39412 3.60721 4.07647 3.28578 3.68824 3.28578Z" fill="black" />
                                    <path d="M10.9419 3.28578H6.65364C6.2654 3.28578 5.94775 3.60721 5.94775 4.00007C5.94775 4.39293 6.2654 4.71436 6.65364 4.71436H10.9419C11.3301 4.71436 11.6478 4.39293 11.6478 4.00007C11.6478 3.60721 11.3301 3.28578 10.9419 3.28578Z" fill="black" />
                                </svg>
                                <span style={{ marginLeft: '8px' }}>Пропустить</span>
                            </Button>
                            <Button
                                type="primary"
                                className='bidding-btn'
                                style={{ float: 'right', marginRight: '10px' }}
                                onClick={this.step}
                            >
                                <span style={{ marginLeft: '10px' }}>
                                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 5.00004L9.63529 9.73219C9.30588 10.0893 8.79118 10.0893 8.46176 9.73219C8.13235 9.37504 8.13235 8.81701 8.46176 8.45987L11.6735 5.00004L8.46176 1.5179C8.13235 1.16076 8.13235 0.602722 8.46176 0.245579C8.79118 -0.111564 9.30588 -0.111564 9.63529 0.245579L14 5.00004Z" fill="white" />
                                        <path d="M-0.000100175 5.00003C-0.000100153 4.50896 0.370488 4.10718 0.82343 4.10718L12.7646 4.10718C13.2175 4.10718 13.5881 4.50896 13.5881 5.00003C13.5881 5.49111 13.2175 5.89289 12.7646 5.89289L0.82343 5.89289C0.370488 5.89289 -0.000100196 5.49111 -0.000100175 5.00003Z" fill="white" />
                                    </svg>
                                </span>
                                <span style={{ marginLeft: '15px' }}>Подтвердить</span>
                            </Button>
                        </Card>
                    </div>
                </div>

            </div>

        );
    }
}


const Step1 = Form.create({ name: 'normal_login' })(Step);
export default (Step1);
