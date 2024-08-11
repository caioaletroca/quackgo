/**
 * This is a joke component only, shows a duck dancing if the query string is "quack"
 * Inspired by barrel roll gag on Google search
 * @param param0 
 * @returns 
 */
export default function Quack({ query }: { query: string }) {
    if(query.toLowerCase() !== 'quack') {
        return null;
    }

    return (
        <div className="flex justify-center">
            <img src='./quack.gif' />
        </div>
    );
}