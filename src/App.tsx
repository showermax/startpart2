import React, {useState} from 'react';
import './App.css';
import {ShoppingList} from "./components/ShoppingList";
import {FilterValue, GoodsType} from "./Typisation";
import {v1} from "uuid";
import {VideoBackground} from "./components/VideoBackground";
import {Header} from "./components/Header/Header";
import styled from "styled-components";
import {Basket} from "./components/ModalWindow/Basket";


function App() {
    const [goods, setGoods] = useState<GoodsType[]>([
        {id: v1(), title: 'Phone', expectedPrice: '$400', realPrice: '$600', inCart: false},
        {id: v1(), title: 'Tablet', expectedPrice: '$520', realPrice: '$500', inCart: false},
        {id: v1(), title: 'Laptop', expectedPrice: '$1000', realPrice: '$1200', inCart: false},
        {id: v1(), title: 'Web-cam', expectedPrice: '$40', realPrice: '$35', inCart: false},
    ])
    const [filter, setFilter] = useState<FilterValue>('All')


    const [modal, setModal] = useState<boolean>(false)

    const addGoods = (title: string) => {
        const getRandomNumberForExpectedPrice = Math.floor((Math.random() * 100) + 1)
        const getRandomNumberForRealPrice = Math.floor((Math.random() * 100) + 1)
        const addNewGoods = {
            id: v1(),
            title: title,
            expectedPrice: `$${getRandomNumberForExpectedPrice}`,
            realPrice: '$' + getRandomNumberForRealPrice,
            inCart: false
        }
        setGoods([...goods, addNewGoods])
    }

    const deleteGoods = (id: string) => {
        setGoods(goods.filter(el => el.id !== id))
    }

    const changeGoodsStatus = (goodsId: string, inChecked: boolean) => {
        setGoods(goods.map(el => el.id === goodsId ? {...el, inCart: inChecked} : el))

    }

    const changeFilterValue = (filter: FilterValue) => {
        setFilter(filter)
    }

    let filteredGoods: Array<GoodsType> = []
    if (filter === 'All') {
        filteredGoods = goods
    }
    if (filter === 'Not to buy') {
        filteredGoods = goods.filter(el => el.inCart !== true)
    }
    if (filter === 'Bought') {
        filteredGoods = goods.filter(el => el.inCart === true)
    }

    const goodsInBaslet = goods.filter(el=>el.inCart)
    return (
        <div className="App">
            <VideoBackground />
            <Wrapper>
                <Header setModal={setModal} countBasket={goodsInBaslet.length}/>
                {modal && <Basket setModal={setModal} goodsInBaslet={goodsInBaslet}/>}
                <ShoppingList
                    title={"What to buy"}
                    goods={filteredGoods}
                    addGoods={addGoods}
                    changeFilterValue={changeFilterValue}
                    deleteGoods={deleteGoods}
                    changeGoodsStatus={changeGoodsStatus}
                    filter={filter}
                />
            </Wrapper>

        </div>
    );
}

export default App;

const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`
