export default function SearchBar({ inputValue, setInputValue }) {
  return (
    <div className="relative w-full font-semibold text-gray-800">
      <input
        className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm outline-offset-0 outline-emerald-400"
        type="text"
        placeholder="Search events"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
      />
      <div className="absolute right-0 top-0 mt-3 mr-4">
        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M13.53 14.47a8 8 0 111.414-1.414l3.96 3.96a1 1 0 01-1.414 1.414l-3.96-3.96zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}
