import { News } from "../type/news"
import { twMerge } from "tailwind-merge"

interface NewsListProps {
  newsList: News[]
  onClickHandler: (...args: any[]) => void 
  className?: string
}

const NewsList: React.FC<NewsListProps> = ({
  newsList,
  onClickHandler,
  className
}) => {
  return (
    <ol
      type="1"
      className={twMerge(`
        pl-4
        h-3/4
      `,
      className
      )}
    >
      {newsList.map((news, index) => (
        <li 
          key={index} 
          onClick={() => onClickHandler(news)} 
          className="cursor-pointer hover:text-2xl"
        >
          {news.title}
        </li>
      ))}
    </ol>
  )
}

export default NewsList