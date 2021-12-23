import { Container } from "./styled";
import { useTransactions } from "../../hooks/useTransactions";

import Entradas from  '../../assets/Entradas.svg'
import Saidas from '../../assets/Saídas.svg'
import Total from '../../assets/Total.svg'

export function Summary() {
    const { transactions } = useTransactions()

    const summary = transactions.reduce((acc, transaction) => {
        if(transaction.type === 'deposit') {
            acc.deposits += transaction.amount
            acc.total += transaction.amount
        } else {
            acc.withdraws += transaction.amount
            acc.total -= transaction.amount
        }

        return acc
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0,
    })

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={Entradas} alt="Entradas" />
                </header>
                <strong>
                    { new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                        }).format(summary.deposits) 
                    }
                </strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={Saidas} alt="Saídas" />
                </header>
                <strong>- 
                    { new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                        }).format(summary.withdraws) 
                    }
                </strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Entradas</p>
                    <img src={Total} alt="Total" />
                </header>
                <strong>
                    { new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                        }).format(summary.total) 
                    }    
                </strong>
            </div>
        </Container>
    )
}