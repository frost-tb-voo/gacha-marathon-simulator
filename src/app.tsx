import { useState } from "preact/hooks";
import "./app.css";

export function App() {
  const [probabilityPercentage, setProbabilityPercentage] = useState(3.0);
  const [gachaCount, setGachaCount] = useState(20);
  const [tryCount, setTryCount] = useState(10);
  const [wantedCount, setWantedCount] = useState(2);

  const probabilityPerTry = (() => {
    const probability = probabilityPercentage / 100;
    let result = 1.0;
    for (let rr = 0; rr < wantedCount; rr++) {
      if (rr > 0) {
        let numerator = 1;
        let denomitor = 1;
        for (let jj = 0; jj < rr; jj++) {
          numerator *= gachaCount - jj;
          denomitor *= jj + 1;
        }
        result -=
          (numerator *
            probability ** rr *
            (1 - probability) ** (gachaCount - rr)) /
          denomitor;
        console.log(rr + ": " + result);
      } else {
        result -= (1 - probability) ** gachaCount;
        console.log(rr + ": " + result);
      }
    }
    return result;
  })();

  return (
    <>
      <h1>汎用リセマラシミュレータ</h1>
      <p>
        <p>最高レア・もしくは欲しいカードが出る確率（％）</p>
        <input
          type="number"
          value={probabilityPercentage}
          min="0"
          max="100"
          step="0.1"
          onChange={(event) => {
            if (event.target instanceof HTMLInputElement)
              setProbabilityPercentage(parseFloat(event.target.value));
          }}
        />
      </p>
      <p>
        <p>起動１回につきリトライまでに引ける枚数</p>
        <input
          type="number"
          value={gachaCount}
          min="1"
          onChange={(event) => {
            if (event.target instanceof HTMLInputElement)
              setGachaCount(parseInt(event.target.value));
          }}
        />
      </p>
      <p>
        <p>マラソンをやめるまでのトライ回数</p>
        <input
          type="number"
          value={tryCount}
          min="1"
          onChange={(event) => {
            if (event.target instanceof HTMLInputElement)
              setTryCount(parseInt(event.target.value));
          }}
        />
      </p>
      <p>
        <p>最高レア・もしくは欲しいカードが何枚出たら終了しますか？</p>
        <input
          type="number"
          value={wantedCount}
          min="1"
          onChange={(event) => {
            if (event.target instanceof HTMLInputElement)
              setWantedCount(parseInt(event.target.value));
          }}
        />
      </p>
      <p>
        <p>起動１回あたりで{wantedCount}枚以上出る確率</p>
        <p>{100 * probabilityPerTry}％</p>
      </p>
      <p>
        <p>マラソン終了までに{wantedCount}枚以上出る確率</p>
        <p>{100 * (1 - (1 - probabilityPerTry) ** tryCount)}％</p>
      </p>
      <p>
        使用例：これから始めようと思っているアプリのガチャで最高レア（星５）が出る確率は３％。
        キャンペーンで新規プレイヤーには２０回引く権利が与えられている。
        現実を考えて就寝までにやり直せるのはだいたい１０回程度。
        さて最高レアを２枚引ける確率はどの程度？
      </p>
    </>
  );
}
