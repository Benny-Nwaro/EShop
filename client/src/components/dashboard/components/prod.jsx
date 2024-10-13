


<Card
hoverable
style={{ width: 500 }}
cover={<img alt="example" src="https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074075.jpg" />}
>
<Meta title={product.name} description={description} />
{showBtn && (
  <Link className="btn btn-primary" to={uploadImages}>
    Add Images
  </Link>
)}





<div class="container text-center">
  <div class="row">
    <div class="col">
    {products.map((product, index) => (
          <Product
            key={index}
            link={`products/${product._id}`}
            product={product}
            description={productDetails(product)}
            thumbnail={product.thumbnail}
          />
        ))}
    </div>   
  </div>
</div>
</Card>