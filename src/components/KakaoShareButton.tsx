import React from "react";
import { Button } from "react-bootstrap";
import { IResult } from "../stores/Result/types";
const Kakao = (window as any).Kakao;

interface Props {
  data: IResult;
}

function KakaoShareButton(props: Props) {
  const url = "https://mbtitestts.netlify.app";
  const resultUrl = window.location.href;

  React.useEffect(() => {
    Kakao.init("bb036b86ddc876308abcec82315ace52");
  }, []);

  const shareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "😼 예비집사 판별기 결과😼",
        description: `예비 집사님이 고양이를 키운다면 가장 잘맞는 고양이는 ${props.data.name}입니다.`,
        imageUrl: url + props.data.image,
        link: {
          mobileWebUrl: resultUrl,
          webUrl: resultUrl,
        },
      },
      social: {
        likeCount: 10,
        commentCount: 20,
        sharedCount: 30,
      },
      buttons: [
        {
          title: "나도 테스트하러가기",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };

  return (
    <Button
      onClick={shareKakao}
      className="btn-warning"
      style={{ width: 170, marginTop: 20 }}
    >
      공유하기
    </Button>
  );
}

export default KakaoShareButton;
