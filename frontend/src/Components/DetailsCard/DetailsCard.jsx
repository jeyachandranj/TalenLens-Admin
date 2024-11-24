import './Detailscard.css'

const DetailsCard = ({title,value}) => {

    return(
        <section className='DetailsCard-Container'>
            <div className='card-content'>
                <h1>{value}</h1>
                <p className='card-title'>{title}</p>
            </div>
        </section>
    )
}

export default DetailsCard