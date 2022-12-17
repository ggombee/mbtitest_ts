import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { createSearchParams, useNavigate } from "react-router-dom";

import { QuestionData } from "../stores/Question/QuestionData";
import Header from "../components/Header";

function QuestionPage(): React.ReactElement {
  const [questionNo, setQuestionNo] = React.useState(0);
  const [totalScore, setTotalScore] = React.useState([
    { id: "EI", score: 0 },
    { id: "SN", score: 0 },
    { id: "TF", score: 0 },
    { id: "JP", score: 0 },
  ]);
  const navigate = useNavigate();

  const handleClickAnswer = (ans: number, type: string) => {
    const newScore = totalScore.map(s =>
      s.id === type ? { id: s.id, score: s.score + ans } : s,
    );

    setTotalScore(newScore);
    // 마지막 문제가 아닐경우
    if (QuestionData.length !== questionNo + 1) {
      setQuestionNo(questionNo + 1);
      //마지막 문제일 경우
    } else {
      const mbti = "ENTJ";
      navigate({
        pathname: "/result",
        search: `?${createSearchParams({
          mbti: mbti,
        })}`,
      });
    }
  };

  return (
    <Wrapper>
      <Header type="progress" questionNo={questionNo} />
      <ContentsWrapper>
        <Title>{QuestionData[questionNo].title}</Title>
        <ButtonGroup>
          <Button
            className="btn-warning"
            style={{
              marginRight: "20px",
              width: "45%",
              minHeight: "200px",
              fontSize: "15pt",
            }}
            onClick={() => handleClickAnswer(1, QuestionData[questionNo].type)}
          >
            {QuestionData[questionNo].answera}
          </Button>
          <Button
            className="btn-warning"
            style={{
              width: "45%",
              minHeight: "200px",
              fontSize: "15pt",
            }}
            onClick={() => handleClickAnswer(0, QuestionData[questionNo].type)}
          >
            {QuestionData[questionNo].answerb}
          </Button>
        </ButtonGroup>
      </ContentsWrapper>
    </Wrapper>
  );
}

export default QuestionPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: #fffacd;
  font-family: "Jalnan";
`;

const ContentsWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px 20px 20px 20px;
`;

const Title = styled.div`
  margin-top: 20px;
  font-size: 25pt;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 40px;
  button {
    font-size: 18pt;
  }
`;
