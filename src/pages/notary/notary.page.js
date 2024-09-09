import React, { useState, useEffect } from 'react'

import HttpClient from '../../helpers/network/HttpClient'

// COMPONENTS
import Layout from '../../components/layout/Layout'
import DataTable from '../../components/table/DataTable'
import ActionTable from '../../components/table/ActionTable'
import NotaryDialog from './components/NotaryDialog'
import '../procedurenotarial/scss/procedurenotarial.page.scss'
import NewProcedure from '../../components/layout/components/NewProcedure'

const Notary = () => {
    const [listNotaries, setListNotaries] = useState([])
    const [notaryDialog, setNotaryDialog] = useState()
    const [notary, setNotary] = useState()
    const [loader, setLoader] = useState(false)

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: text => <span>{text}</span>
        },
        {
            title: 'Contacto',
            dataIndex: 'contact',
            key: 'contact',
            render: text => <span>{text}</span>
        },
        {
            title: 'Dirección',
            dataIndex: 'address',
            key: 'address',
            render: text => <span>{text}</span>
        },
        {
            title: 'Correo',
            dataIndex: 'email',
            key: 'email',
            render: text => <span>{text}</span>
        },
        {
            title: 'Teléfono',
            dataIndex: 'phone',
            key: 'phone',
            render: text => <span>{text}</span>
        },
        {
            title: 'Acción',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <ActionTable
                    handleSee={() => handleSee(record)}
                />
            )
        }
    ]

    const handleSee = (notary) => {
        setNotary(notary)
        setNotaryDialog({ notary })
    }

    const callbackNotary = () => {
        getNotaries()
        setNotaryDialog(null)
    }

    const getNotaries = async () => {
        const response = await HttpClient.get('/api/notary')
        if (response.status == 200) {
            setListNotaries(response.data)
        }
    }

    useEffect(() => {
        getNotaries()
        setLoader(true)
        setTimeout(() => {
            setLoader(false)
        }, 3000)
    }, [])

    return (
        <>
            <NotaryDialog
                notary={notary}
                data={notaryDialog}
                setData={setNotaryDialog}
                callback={callbackNotary}
            />
            <Layout loader={loader} classNameMain="mainTable">
                <NewProcedure title='Notarias' />
                <div className="header-page">
                    <h6>A continuación encontrarás todos las Notarías</h6>

                    <div className="main-card card">
                        <div className="main-card-table">
                            <DataTable
                                columns={columns}
                                data={listNotaries}
                                pagination={{ position: ['bottomCenter'] }}
                            />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}


export default Notary
