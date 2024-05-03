import {Link} from 'react-router-dom'
export const NavBar = () => {
    // ADD THE LOGOUT LOGIC 
    return (<>
        <div>
        <h1> Adventurer's Store</h1>
        </div>
        <div>
            <Link to="/shop">Store</Link>
            <Link to ="/purchased-items">Purchases</Link>
            <Link to="/checkout">Checkout</Link>
            <button>logout</button>

        </div>
    </>)
}