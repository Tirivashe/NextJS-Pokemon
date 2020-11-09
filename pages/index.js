import Layout from '../components/Layout'
import Link from 'next/link'

export default function Home({ pokemon }) {
  return (
    <Layout title="Pokedex in Next">
      <h1 className="text-4xl mb-8 text-center"> Welcome to The Pokedex</h1>
      <ul>
        {pokemon.map((poke, index) => (
          <li key={index}>
            <Link href={`/pokemon?id=${index + 1}`}>
              <a className="border p-4 border-grey my-2 capitalize flex items-center text-lg bg-gray-200 rounded-md">
                <img className="w-20 h-20 mr-3" src={poke.image} alt={poke.name}/>
                <span className="mr-2 font-bold">{index + 1}.</span>
                {poke.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export async function getStaticProps(ctx){
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
    const { results } = await res.json()
 
    const pokemon = results.map((poke, index) => {
      const paddedIndex = `00${index + 1}`.slice(-3)
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`
      return {
        ...poke,
        image
      }
    })

    return{
      props: {
        pokemon
      }
    }
 
   } catch (error) {
     console.log(error)
   }

}