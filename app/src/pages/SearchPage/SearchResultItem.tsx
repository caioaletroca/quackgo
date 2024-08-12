import { SearchResult } from "@/types";
import { Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function getHighlightText(query: string, text: string) {
    const queries = query.toLowerCase().split(' ');
    const chunks = text.split(new RegExp(`(${queries.join('|')})`, 'gi'));

    return (
        <>
            {chunks.map((chunk, index) => {
                if(queries.includes(chunk.toLowerCase())) {
                    return <span key={index} className="bg-orange-900">{chunk}</span>
                }

                return chunk;
            })}
        </>
    )
}

export type SearchResultItemProps = SearchResult & {
    query?: string;
}

export default function SearchResultItem({ query, FirstURL, Text }: SearchResultItemProps) {
    const navigate = useNavigate();

    const handleClick = () => navigate(FirstURL);

    return (
        <div className="search-result flex flex-col mb-6" onClick={handleClick}>
            <Typography variant="body2">{FirstURL}</Typography>
            <Link variant='h6' className="text" href={FirstURL} underline="hover">{getHighlightText(query!, Text)}</Link>
        </div>
    );
}