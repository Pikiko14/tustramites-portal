import React, { useContext, useEffect, useState } from 'react'
import { Collapse, Input } from 'antd'
import HttpClient from '../../helpers/network/HttpClient'
import { Context } from '..//../context/store'

// COMPONENTS
import Layout from '../../components/layout/Layout'

const { Panel } = Collapse

const FrequentQuestions = () => {
  const [selected, setSelected] = useState()
  const [categories, setCategories] = useState([])
  const [subcategories, setSubCategories] = useState([])
  const [questions, setQuestions] = useState([])
  const [search, setSearch] = useState(false)
  const [searchs, setSearchs] = useState([])
  const { dispatch } = useContext(Context)

  const handleSearch = (value) => {
    if (value != '') {
      let data = questions.filter(
        (x) => x.question.search(value) > -1 || x.answer.search(value) > -1
      )
      setSearch(true)
      setSearchs(data)
    } else {
      setSearch(false)
      setSearchs([])
    }
  }

  const getCategories = async () => {
    const response = await HttpClient.get('/api/categoryquestion')
    if (response.status == 200) {
      setCategories(response.data)
    }
  }

  const getSubCategories = async () => {
    const response = await HttpClient.get('/api/subcategoryquestion')
    if (response.status == 200) {
      setSelected(response.data[0]._id)
      setSubCategories(response.data)
    }
  }

  const getQuestions = async () => {
    const response = await HttpClient.get('/api/question')
    if (response.status == 200) {
      if (response.data.length > 0) setQuestions(response.data)
    }
  }

  useEffect(() => {
    getCategories()
    getSubCategories()
    getQuestions()
  }, [])

  return (
    <Layout visible={false}>
      <div className="page-title">
        <h1>Preguntas frecuentes</h1>
        <img src="/assets/images/question.png" />
      </div>
      <div className="page-content">
        <div className="frequent-questions">
          <div className="tree-root">
            <Input.Search placeholder="Buscar ..." onSearch={handleSearch} />
            <Collapse style={{ marginTop: '20px' }} defaultActiveKey={['0']}>
              {categories.map((item, i) => (
                <Panel header={item.name} key={i}>
                  <ul>
                    {subcategories
                      .filter((x) => x.category._id == item._id)
                      .map((sub, j) => (
                        <li
                          key={j}
                          className={selected == sub._id ? 'active' : ''}
                          onClick={() => setSelected(sub._id)}
                        >
                          {sub.name}
                        </li>
                      ))}
                  </ul>
                </Panel>
              ))}
            </Collapse>
          </div>
          <div className="tree-content">
            <div className="page-content-frequent">
              {search ? (
                <>
                  {searchs.map((item, i) => (
                    <>
                      <h2>{item.question}</h2>
                      <p>{item.answer}</p>
                    </>
                  ))}
                </>
              ) : (
                <>
                  {questions
                    .filter((x) => x.subcategory._id == selected)
                    .map((item, i) => (
                      <>
                        <h2>{item.question}</h2>
                        <p>{item.answer}</p>
                      </>
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="frequent-icon">
          <p className="frequent-icon-title">
            Si tienes alguna inquietud adicional, no dudes en contactarnos.
          </p>
          <ul>
            <li
              onClick={() =>
                dispatch({
                  type: 'CHAT_ME',
                  payload: true
                })
              }
            >
              <img src="/assets/icon/home_message.svg" />
              <p>Chat en línea</p>
            </li>
            <li
              onClick={() =>
                dispatch({
                  type: 'CALL_ME',
                  payload: true
                })
              }
            >
              <img src="/assets/icon/home_support.svg" />
              <p>Nosotros te llamamos</p>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default FrequentQuestions
