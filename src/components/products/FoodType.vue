<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类管理</el-breadcrumb-item>
        </el-breadcrumb>
        <router-link :to="{name:'FoodTypeEditor'}" class="el-button el-button--danger">新增</router-link>
        <el-table :data="data" stripe border style="width: 100%">
            <el-table-column type="index" label="序号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="名字" width="180">
            </el-table-column>
            <el-table-column prop="description" label="备注">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
         <el-pagination
            layout="prev, pager, next"
             :page-count="pageCount"
            @current-change="pageChange"
            >
            
        </el-pagination>
        </div>
        <el-dialog title="提示" v-model="dialogVisible" size="tiny">
            <span>{{dialogMsg}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false;delItem={}">取 消</el-button>
                <el-button type="primary" @click="doDel">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import api from '../../services/api_food_type'
    export default {
        data() {
            return {
                data:[],    
                dialogVisible:false,
                delItem:{}, //点击删除后临时保存数据
                dialogMsg:'',
                pageCount: 1 ,
                pageIndex: 1,

            }
        },
        created() {
            this.getData()
        },
        methods: {
            handleEdit(index, row) {
                this.$router.push({name:'FoodTypeEditor',params:{id:row._id}})
            },
            handleDelete(index, row) {
                this.dialogVisible = true
                this.dialogMsg = `确认删除:${row.name}`
                // console.log(index, row);
                this.delItem = row
                   
            },
            getData() {
                api.getData(this.pageIndex,function (res) {
                    this.data = res.data.res
                    this.pageCount = res.data.pageCount
                }.bind(this))
            },
            doDel (){//确认删除
                this.dialogVisible = false
                api.delete(this.delItem._id, function (res) {
                    if (res.status == "y") {
                       this.$message.success('删除成功')
                       //为了实现删除之后刷新页面的效果给路由加个无用的值，实现路由改变
                       this.$router.push({name:'FoodType', query: { random: Math.random() }})   
                    }
                    else{
                        this.$message.error(res.msg)
                    }
                }.bind(this))  
            },
            pageChange (currentpage) {
                this.pageIndex = currentpage
                this.getData()
            }
        },
        watch: {
            //     路由变化的时候提调用获取数据
            $route: function () {
                console.log('获取分类列表数据')
                this.getData()
            }
        }
    }

</script>
<style>

</style>