import React from "react";
import styled from "styled-components";
import { Button, Image } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ResultData } from "../stores/Result/ResultData";
import Header from "../components/Header";
import PangImage from "../assets/ggompang.jpeg";
import { IResult } from "../stores/Result/types";

function ResultPage(): React.ReactElement {
  const [searchParmas] = useSearchParams();
  const mbti = searchParmas.get("mbti"); // 예비집사의 MBTI
  const testResult = ResultData.find((cat: IResult) => cat.best === mbti);
  const friendCat = ResultData.find(friend => friend.best === testResult?.mbti);

  return (
    <>
      <Wrapper>
        <Header type="title" questionNo={0} />
        <ContentsWrapper>
          <Title>결과 보기</Title>
          <ResultImage>
            <Image
              src={testResult?.image}
              width={350}
              height={350}
              className="rounded-circle"
            />
          </ResultImage>
          <Desc>
            {testResult?.best}형 예비집사님과 찰떡궁합인 고양이는{" "}
            {testResult?.mbti}형 고양이 {testResult?.name}입니다.
          </Desc>
          <Desc>
            {testResult?.name} 고양이는 {testResult?.desc}
          </Desc>
          <BestDesc>
            나의 고양이와 잘맞는 형제묘로는 {friendCat?.name} 추천드려요.
          </BestDesc>
        </ContentsWrapper>
      </Wrapper>
    </>
  );
}

export default ResultPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #fffacd;
  font-family: "Jalnan";
`;

const ContentsWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;
  padding: 20px 60px 20px 60px;
`;

const Title = styled.div`
  margin-top: 20px;
  font-size: 25pt;
`;

const ResultImage = styled.div`
  width: 200;
  height: 200;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 15pt;
`;

const BestDesc = styled.div`
  font-size: 15pt;
  color: blue;
`;
