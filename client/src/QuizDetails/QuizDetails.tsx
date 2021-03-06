import React, { useEffect, useState } from 'react';
import quizService from '../service/quiz-service';
import { useParams } from 'react-router-dom'
import firebase from 'firebase'
import './QuizDetails.scss';
import { useHistory } from 'react-router-dom';
import Select from '../components/Select/Select'



function QuizDetails(props: any) {

    const history = useHistory();



    const [questions, setQuestions] = useState<{ question: string, options: {}, answer: string }[]>([{ question: "", options: {}, answer: "" }])

    const [selectedAnswer, setSeletedAnswer] = useState()

    function getSelectedAnswer(e) {
        const newSelected = e.target.value;
        setSelectedAnswer(newSelected)
    }




    const quizId = props.match.params.id

    function getQuizDetails() {
        quizService
            .getQuizDetails(quizId)
            .then((data) => setQuestions(data.questions))
            .catch((error: Error) => console.log('Error getting categories: ' + error.message));

    };

    useEffect(() => {
        getQuizDetails()
    }, [setQuestions]);


    function updateSingleQuestion(index: number, e) {

        setQuestions(prevState => (prevState.map(
            (el, idx) => idx === index ? { ...el, question: e.target.value } : el
        )))
    }
    function updateSingleAnswer(index: number, e) {

        setQuestions(prevState => (prevState.map(
            (el, idx) => idx === index ? { ...el, answer: e.target.value } : el
        )))
    }

    function updateSingleOption(index: number, key: string, e) {

        setQuestions(prevState => (prevState.map(
            (el, idx) => idx === index ? { ...el, options: { ...el.options, [key]: e.target.value } } : el
        )))
    }



    function updateQuiz() {

        const quizId = props.match.params.id

        const newQuestions = questions
        quizService
            .updateQuiz(newQuestions, quizId)
            .then(response => {
                history.push("/user/update/success");


            })
            .catch((error: Error) => console.log('Error ' + error.message));



    }
    //<p className="row">Answers:<input value={item.answer} onChange={(e) => updateSingleAnswer(index, e)} /></p>



    return (
        <div className="QuizDetails">


            <div>
                {questions.map((item, index) =>
                    <div key={index}>
                        <p className="row">Question:<input className="questionInput" value={item.question} onChange={(e) => updateSingleQuestion(index, e)} /></p>
                        <br></br>

                        <p className="row">Options: {Object.entries(item.options).map(([key, value]) => <input value={value} onChange={(e) => updateSingleOption(index, key, e)} />)}</p>
                        <br></br>

                        <p className="row">Select the right answer: <Select value={selectedAnswer} onChange={(e) => updateSingleOption(index, key, e)}>
                            {Object.entries(item.options).map(([key, value]) => <option value={value}>{value}</option>)}
                        </Select></p>


                        <br></br>



                    </div>)
                }



            </div >

            <button onClick={updateQuiz}>Update your quiz</button>



        </div >
    );
}

export default QuizDetails;
