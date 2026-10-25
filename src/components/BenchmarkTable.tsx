import type { Project } from '../content'
import { isShown } from '../lib/todo'
import { Filled } from './Todo'

type BenchmarkTableProps = NonNullable<Project['benchmarks']>

export function BenchmarkTable({ title, rows, note }: BenchmarkTableProps) {
  const shown = rows.filter((row) => isShown(row.speedup))

  return (
    <>
      <div className="table-wrap">
        <table className="benchmarks">
          <caption>{title}</caption>
          <thead>
            <tr>
              <th scope="col">Optimisation</th>
              <th scope="col">Speedup</th>
              <th scope="col">Measured on</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((row) => (
              <tr key={row.name}>
                <th scope="row">{row.name}</th>
                <td className="benchmarks__speedup">
                  <Filled value={row.speedup}>{(text) => text}</Filled>
                </td>
                <td>
                  <Filled value={row.measuredOn}>{(text) => text}</Filled>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="note">{note}</p>
    </>
  )
}
