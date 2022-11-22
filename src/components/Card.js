const Card = ({ image, selected, onClick }) => {
    return (
        <div className="card">
            <div className={slected && "selected"}>
                <img 
                    alt="" 
                    className="card-face" 
                    src={image} 
                />
                <img 
                    alt="" 
                    className="card-back" 
                    src={'/assets/fireship.png'} 
                />
            </div>
        </div>
    )
}

export default Card;