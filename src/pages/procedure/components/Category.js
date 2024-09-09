import React from 'react'

const Category = ({ categories, loadNotarialActs, categorySelected }) => {
  return (
    <>
      {categories.map((category, i) => (
        <>
          {category.name === 'Familia' && (
            <>
              <div className="centrarArrow">
                <div
                  className={
                    categorySelected && categorySelected.name === category.name
                      ? 'card-tramite-active'
                      : 'card-tramite'
                  }
                  onClick={() => loadNotarialActs(category)}
                >
                  {categorySelected && categorySelected.name === category.name ? (
                    <img
                      className="icon-card"
                      src="/assets/icon/familyWhite.svg"
                      alt="/assets/icon/familyWhite.svg"
                    ></img>
                  ) : (
                    <img
                      className="icon-card"
                      src="/assets/icon/family.svg"
                      alt="/assets/icon/family.svg"
                    ></img>
                  )}
                  <h3 className="title-indicaciones">Familia</h3>
                </div>
                <div
                  className={
                    categorySelected && categorySelected.name === category.name ? 'arrow' : ''
                  }
                ></div>
              </div>
            </>
          )}

          {category.name === 'Inmobiliario' && (
            <div className="centrarArrow">
              <div
                className={
                  categorySelected && categorySelected.name === category.name
                    ? 'card-tramite-active'
                    : 'card-tramite'
                }
                onClick={() => loadNotarialActs(category)}
              >
                {categorySelected && categorySelected.name === category.name ? (
                  <img
                    className="icon-card"
                    src="/assets/icon/hometramiteWhite.svg"
                    alt="/assets/icon/hometramiteWhite.svg"
                  ></img>
                ) : (
                  <img
                    className="icon-card"
                    src="/assets/icon/hometramite.svg"
                    alt="/assets/icon/hometramite.svg"
                  ></img>
                )}
                <h3 className="title-indicaciones">Inmobiliario</h3>
              </div>
              <div
                className={
                  categorySelected && categorySelected.name === category.name ? 'arrow' : ''
                }
              ></div>
            </div>
          )}

          {category.name === 'Empresarial' && (
            <div className="centrarArrow">
              <div
                className={
                  categorySelected && categorySelected.name === category.name
                    ? 'card-tramite-active'
                    : 'card-tramite'
                }
                onClick={() => loadNotarialActs(category)}
              >
                {categorySelected && categorySelected.name === category.name ? (
                  <img
                    className="icon-card"
                    src="/assets/icon/enterpriseWhite.svg"
                    alt="/assets/icon/enterpriseWhite.svg"
                  ></img>
                ) : (
                  <img
                    className="icon-card"
                    src="/assets/icon/enterprise.svg"
                    alt="/assets/icon/enterprise.svg"
                  ></img>
                )}
                <h3 className="title-indicaciones">Empresarial</h3>
              </div>
              <div
                className={
                  categorySelected && categorySelected.name === category.name ? 'arrow' : ''
                }
              ></div>
            </div>
          )}

          {category.name === 'Trámites especiales' && (
            <div className="centrarArrow">
              <div
                className={
                  categorySelected && categorySelected.name === category.name
                    ? 'card-tramite-active'
                    : 'card-tramite'
                }
                onClick={() => loadNotarialActs(category)}
              >
                {categorySelected && categorySelected.name === category.name ? (
                  <img
                    className="icon-card"
                    src="/assets/icon/filehandWhite.svg"
                    alt="/assets/icon/filehandWhite.svg"
                  ></img>
                ) : (
                  <img
                    className="icon-card"
                    src="/assets/icon/filehand.svg"
                    alt="/assets/icon/filehand.svg"
                  ></img>
                )}
                <h3 className="title-indicaciones">Trámites especiales</h3>
              </div>
              <div
                className={
                  categorySelected && categorySelected.name === category.name ? 'arrow' : ''
                }
              ></div>
            </div>
          )}
        </>
      ))}
    </>
  )
}

export default Category
