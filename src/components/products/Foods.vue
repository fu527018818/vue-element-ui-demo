<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        </el-breadcrumb>
        <router-link :to="{name:'FoodsEditor'}" class="el-button el-button--danger">新增</router-link>
        <el-table :data="data" stripe border style="width: 100%">
            <el-table-column align="center" type="index" label="序号" width="80">
            </el-table-column>
            <el-table-column prop="name" label="图片" width="100">
                <template scope="scope">
                    <img class="p-img" :src="'http://localhost:2900/'+scope.row.img" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="name" label="名字" width="180">
            </el-table-column>
            <!-- formatter 格式化行中的现实内容 -->
            <el-table-column prop="type" :formatter="getTypeName" label="分类" width="180">
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
            <el-pagination layout="prev, pager, next" :page-count="pageCount" @current-change="pageChanged">
            </el-pagination>
        </div>

        <el-dialog title="提示" v-model="dialogVisible" size="tiny">
            <span>{{dialogMsg}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false;this.delItem={}">取 消</el-button>
                <el-button type="primary" @click="doDel">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import apiType from '../../services/api_food_type'
    import apiFood from '../../services/api_food'
    export default {
        data() {
            return {
                data: [],
                types:[], //所有的分类数据
                dialogVisible:false,
                delItem:{}, //点击删除后临时保存数据
                dialogMsg:'',
                pageIndex:1,
                pageCount:1
            }
        },
        methods: {
            handleEdit(index, row) {
                // console.log(index, row);
                this.$router.push({name:'FoodsEditor',params:{id:row._id}})
            },
            handleDelete(index, row) {
                this.dialogVisible = true
                this.dialogMsg = `确认删除:${row.name}`
                // console.log(index, row);
                this.delItem = row
            },
            doDel:function(){//确认删除
                this.dialogVisible = false
                apiFood.delete(this.delItem._id, function (res) {
                    if (res.status == 'y') {
                        this.$message.success('删除成功')
                        console.dir(this.$router)
                        //为了实现删除之后刷新页面的效果 我们为此路由添加一个无用的随机数做为参数
                        this.$router.push({ name: 'Foods', query: { random: Math.random() } })
                    }
                    else {
                        this.$message.error(res.msg)
                    }
                }.bind(this))
            },
            initData:function(){
                if(this.types.length==0){//判断当前分类数据是否为空
                    console.log('重新初始化分类数据')
                    apiType.getAllData(function(res){
                        this.types = res.data
                    }.bind(this))
                }
            },//得到数据
            getData:function(){
                apiFood.getData(this.pageIndex, function (res) {
                    this.pageCount = res.data.pageCount
                    this.data = res.data.res
                }.bind(this))
            },
            pageChanged:function(page){//分页页码改变
                this.pageIndex = page
                this.getData()
            },
            getTypeName:function(row, column){//格式化数据,把type列的id转换为名字
                console.log(this.types)
                console.log(row)
                return this.types.find(item=>{
                    console.log(item)
                    return item._id == row.type
                }).name
            }
        },
        created:function(){
            this.initData()
            this.getData()
        },
        watch:{
            $route:function(){
                this.initData()
                this.getData()
            }
        }
    }

</script>
<style>
    .p-img {
        max-width: 60px;
    }
</style>