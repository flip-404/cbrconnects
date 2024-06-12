/* eslint-disable @typescript-eslint/no-explicit-any */
type PostListCardProps = {
  lable: string
  data: any
}

function PostListCard({ lable, data }: PostListCardProps) {
  return (
    <div>
      <span className="text-[24px] text-[#3b4890] font-[700]">{lable}</span>
      <table className="text-[13px] font-[700]">
        <tbody className="flex flex-col gap-[2px]">
          {data.map((val: any) => (
            <tr className="flex justify-between" key={val.id}>
              <td className="flex items-center w-[300px] text-left whitespace-nowrap overflow-hidden text-ellipsis">
                {val.title}{' '}
                {val.date === '20분전' && (
                  <span className="text-red-500 text-[11px]">&nbsp;[new]</span>
                )}
              </td>
              <td className="flex items-center justify-center w-[100px] text-center whitespace-nowrap ">
                {val.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PostListCard
