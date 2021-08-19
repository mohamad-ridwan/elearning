import React from 'react';
import './Pagination.scss'

function Pagination({ perPage, totalData, paginate, classPaginate, mouseEnter, mouseLeave, fromNumber, toNumber, lengthData }) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalData / perPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <>
            <div className="wrapp-pagination">
                <p className="total-page-show">
                    Showing {fromNumber} to {toNumber} of {lengthData} entries
                </p>

                <div className="container-btn-pagination">
                    <ul className="column-list-number-pagination">
                        {pageNumbers.map((e, i) => {
                            return (
                                <>
                                    <li key={e} className={classPaginate} onClick={() => paginate(e)}
                                        onMouseEnter={() => mouseEnter(i)}
                                        onMouseLeave={() => mouseLeave(i)}
                                    >
                                        {e}
                                    </li>
                                </>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Pagination;