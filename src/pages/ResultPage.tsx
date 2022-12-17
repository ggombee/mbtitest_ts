import React from "react";
import styled from "styled-components";
import { Image, Button } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";

import { ResultData } from "../stores/Result/ResultData";
import Header from "../components/Header";
import { IResult } from "../stores/Result/types";
import KakaoShareButton from "../components/KakaoShareButton";

function ResultPage(): React.ReactElement {
  const [searchParmas] = useSearchParams();
  const mbti = searchParmas.get("mbti"); // 예비집사의 MBTI
  const testResult: IResult = ResultData.find(
    (cat: IResult) => cat.best === mbti,
  ) ?? {
    id: 0,
    name: "",
    best: "",
    desc: "",
    image: "",
    mbti: "",
  }; // 잘맞는 고양이
  const friendCat = ResultData.find(friend => friend.best === testResult?.mbti); // 고양이와 잘맞는 형제묘
  const navigate = useNavigate();

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
          <br />
          <Desc>
            {testResult?.name} 고양이는 {testResult?.desc}
          </Desc>
          <br />
          <BestDesc>
            나의 고양이와 잘맞는 형제묘로는 {friendCat?.name} 추천드려요.
          </BestDesc>
          <div
            style={{ marginBottom: 30, display: "flex", flexDirection: "row" }}
          >
            <Button
              onClick={() => navigate("/")}
              className="btn-danger"
              style={{ width: 150, marginTop: 20, marginRight: 20 }}
            >
              테스트 다시하기
            </Button>
            <KakaoShareButton data={testResult} />
          </div>
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
  font-size: 25pt;
`;

const ResultImage = styled.div`
  width: 200;
  height: 200;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 13pt;
`;

const BestDesc = styled.div`
  font-size: 15pt;
  color: blue;
`;
