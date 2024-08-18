import './index.css'

const Item = prop => {
  const {data} = prop
  const {name, description, imageUrl} = data
  return (
    <li className="cardContainer">
      <img src={imageUrl} alt={name} className="image" />
      <div className="textContainer">
        <h1 className="imageTitle">{name}</h1>
        <p className="description">{description}</p>
      </div>
    </li>
  )
}
export default Item
