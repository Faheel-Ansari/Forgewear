import { ProductDynamicCategory } from '../../index'

function ManageStock() {
  return (
    <div className="w-full py-2 flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 lg:gap-8">
      <ProductDynamicCategory page={"stock"} />
    </div>
  )
}

export default ManageStock