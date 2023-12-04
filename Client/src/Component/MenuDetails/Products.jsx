import { BiSolidHelpCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Products = () => {
    const products = [
        {
            id: 1,
            name: 'Mailer Box'
        },
        {
            id: 2,
            name: 'Pizza Box'
        }
    ]

    const Linker = ({ product }) => {
        if (product.name === 'Pizza Box') {
            return (<Link
                key={product.id}
                className=' text-decoration-none text-secondary'
                to='/CardboardManipulations'>
                {product.name}
            </Link>)
        } else if (product.name === 'Mailer Box') {
            return (<Link
                key={product.id}
                className=' text-decoration-none text-secondary'
                to='/CardboardManipulation'>
                {product.name}
            </Link>)
        }
    }

    return (
        <>
            <div className="d-flex">
                <div className="card mt-2" style={{ 'width': '18rem' }}>
                    <div className="card-header d-flex flex-row justify-content-between align-items-center" style={{ background: '#15807a' }}>
                        <h6 className=' fw-semibold text-white'>Select a product</h6>
                        <BiSolidHelpCircle className=' fs-5 text-white' />
                    </div>
                    <ul className="sizeCardList list-group list-group-flush overflow-auto">
                        {
                            products.map((p) => {
                                return (
                                    <li key={p.id} className="list-group-item"><Linker product={p} /></li>
                                )
                            })
                        }
                    </ul>

                </div>
            </div>
        </>
    )
}

export default Products