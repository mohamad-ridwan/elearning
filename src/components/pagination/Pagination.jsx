import React from 'react';
import './Pagination.scss'

function Pagination() {
    return (
        <>
            <div className="wrapp-pagination">
                <p className="total-page-show">
                    Showing 1 to 10 of 12 entries
                </p>

                <div className="container-btn-pagination">
                    <button className="btn-group-pagination btn-previous">
                        Previous
                    </button>
                    <ul className="column-list-number-pagination">
                        <li>
                            1
                        </li>
                        <li>
                            2
                        </li>
                    </ul>
                    <button className="btn-group-pagination btn-next">
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export default Pagination;