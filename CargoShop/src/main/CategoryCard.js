export default function CategoryCard({ categoryName, onClick }) {
    return (
      <div className="category-icon card p-3 m-2" style={{ width: '18rem' }}>
        <div className="card-body text-center" onClick={onClick}>
          <h5 className="card-title">{categoryName}</h5>
        </div>
      </div>
    );
}