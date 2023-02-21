import "../../style/dashboard.css";
import hello from "../../assets/hello.png";

export default function Dashboard() {
  return (
    <div className="main">
      <div className="main_title">
        <img src={hello} alt="hello" />
        <div className="main_greeting">
          <h1>Olá Gabriel</h1>
          <p>Bem vindo ao seu painel</p>
        </div>
      </div>

      <div className="main_cards">
        <div className="card">
          <i className="fa fa-file-text fa-2x text-lightblue"></i>
          <div className="card_inner">
            <p className="text-primary-p">Número de pedidos</p>
            <span className="font-bold text-title">578</span>
          </div>
        </div>

        <div className="card">
          <i className="fa fa-file-text fa-2x text-lightblue"></i>
          <div className="card_inner">
            <p className="text-primary-p">Número de pedidos</p>
            <span className="font-bold text-title">300</span>
          </div>
        </div>

        <div className="card">
          <i className="fa fa-money-bill fa-2x text-red"></i>
          <div className="card_inner">
            <p className="text-primary-p">Pagamentos</p>
            <span className="font-bold text-title">R$2.577</span>
          </div>
        </div>

        <div className="card">
          <i className="fa fa-archive fa-2x text-lightblue"></i>
          <div className="card_inner">
            <p className="text-primary-p">Número de produtos</p>
            <span className="font-bold text-title">110</span>
          </div>
        </div>
      </div>

      {/* <div className="charts">
        <div className="charts_left">
          <div className="charts_left_title">
            <div>
              <h1>Daily Reports</h1>
              <p>Ubatuba, São Paulo, BR</p>
              <i className="fa fa-usd"></i>
            </div>
          </div>
        </div>

        <div className="charts_right">
          <div className="charts_right_title">
            <div>
              <h1>Daily Reports</h1>
              <p>Ubatuba, São Paulo, BR</p>
              <i className="fa fa-area-chart"></i>
            </div>
          </div>
        </div>

        <div className="charts_right_cards">
          <div className="card1">
            <h1>Lucro</h1>
            <p>R$2500,00</p>
          </div>

          <div className="card2">
            <h1>Pagamentos</h1>
            <h1>R$2500,00</h1>
          </div>

          <div className="card3">
            <h1>Custos de hospedagem</h1>
            <p>R$150,00</p>
          </div>

          <div className="card4">
            <h1>Banco de dados</h1>
            <p>R$190,00</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
